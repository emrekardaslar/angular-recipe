import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscribtion: Subscription;
  recipeName: string = '';
  p: number = 1;
  itemsPerPage: number = 3;
  indexesArray = [];
  searchIndexes: number[] = [];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.subscribtion = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        if (this.recipeName == '') 
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }
  
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSearch() {
    this.p = 1;
    if (this.recipeName == '')  {
      this.recipes = this.recipeService.getRecipes();
      this.searchIndexes = [];
      return;
    }

    else {
     this.recipes.forEach(
       (recipe, index) => {
         if (recipe.name.toLowerCase().includes(this.recipeName.toLowerCase())) {
          this.indexesArray.push(index);
          this.recipeService.setIndexArray(this.indexesArray);
         }  
     });

     this.recipes = this.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.recipeName.toLowerCase()));
     this.searchIndexes = this.findIndexes(this.recipes);
    }
  }

  findIndexes(recipeArray: Recipe[]) {
    let indexes: number[] = [];
    recipeArray.forEach(recipe => {
      indexes.push(this.recipeService.getIndexByName(recipe.name));
    });
    return indexes;
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  pageChanged(event: any): void {
    this.p = event;
  }
}

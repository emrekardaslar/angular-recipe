import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
  recipeName: string;
  p: number = 1;
  itemsPerPage: number = 3;
  searchIndex: number = -1;
  indexesArray = [];
  firstTime = true;
  searchIndexes: number[] = [];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.subscribtion = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }
  
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSearch() {
    this.p = 1;
    this.searchIndex = -1;
    if (this.recipeName == '')  {
      this.recipes = this.recipeService.getRecipes();
      this.searchIndexes = [];
      this.firstTime = true;
      this.searchIndex = -1;
      return;
    }

    if (this.recipeName == '' && !this.firstTime) {
      console.log('first time')
      this.recipeService.setIndexArray([]);
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
      if (this.recipes.length == 1) {
        this.searchIndex = this.recipeService.getRecipes().findIndex(recipe => recipe.name.toLowerCase().includes(this.recipeName.toLowerCase()));
        this.searchIndexes = this.findIndexes(this.recipes);
      }
      else
        this.searchIndexes = this.findIndexes(this.recipes);
    }

    this.firstTime = false;
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

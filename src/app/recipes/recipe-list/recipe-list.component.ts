import { Component, OnDestroy, OnInit } from '@angular/core';
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
    if (this.recipeName == '')
      this.recipes = this.recipeService.getRecipes();
    else
      this.recipes = this.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.recipeName.toLowerCase()));
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  pageChanged(event: any): void {
    this.p = event;
  }
}

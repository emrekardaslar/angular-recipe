import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingretient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    indexArray: number[] = [];
    /*
    recipes: Recipe[] = [
        new Recipe(
            'Schnitzel',
            'This is simply a test',
            'https://germanculture.com.ua/wp-content/uploads/2018/02/schnitzel-e1519859572196.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]

        ),
        new Recipe(
            'Burger',
            'This is simply a test',
            'https://cdn.getiryemek.com/restaurants/1618309789015_1125x522.jpeg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        )
    ];*/

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    getIndexByName(name: string) {
        let res = -1;
        this.recipes.forEach((recipe, index) => {
            if (recipe.name === name) {
                res = index;
            }
        });
        return res;
    }
}
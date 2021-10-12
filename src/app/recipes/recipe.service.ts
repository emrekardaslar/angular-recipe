import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingretient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

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
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    
}
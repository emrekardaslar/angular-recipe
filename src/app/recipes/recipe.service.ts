import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingretient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
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

    constructor(private shoppingListService: ShoppingListService) { }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
}
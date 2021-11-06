import { Ingredient } from "../shared/ingretient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    ingredients: Ingredient[] = [
/*         new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10) */
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    setIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.filter(ingr => ingr.name === ingredient.name);
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        //if in shopping list, update it
        ingredients.forEach(ingredient => {
            let index = this.ingredients.findIndex(ingr => ingr.name === ingredient.name);
            if (index !== -1) {
                this.ingredients[index].amount += ingredient.amount;
            }
        });
        

        //if not in shopping list, add it
        ingredients.forEach(ingredient => {
            if (!this.ingredients.filter(ingr => ingr.name === ingredient.name).length) {
                this.ingredients.push(ingredient);
            }
        });

        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
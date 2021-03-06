import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingretient.model';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const userId = this.authService.user.value.id;
    this.http
      .put(
        'https://recipe-angular-b0f5b-default-rtdb.europe-west1.firebasedatabase.app/'+userId+'/recipes.json',
        recipes
      )
      .subscribe((response) => {
        
      });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://recipe-angular-b0f5b-default-rtdb.europe-west1.firebasedatabase.app/'+user.id+'/recipes.json',
        ).pipe(
          map((recipes) => {
            return recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }),
          tap((recipes) => {
            this.recipeService.setRecipes(recipes);
          })
        )
      })
    );
  }

  storeShoppingList() {
    const shoppingList = this.shoppingListService.getIngredients();
    const userId = this.authService.user.value.id;
    this.http
      .put(
        'https://recipe-angular-b0f5b-default-rtdb.europe-west1.firebasedatabase.app/'+userId+'/shopping-list.json',
        shoppingList
      )
      .subscribe((response) => {
        
      });
  }

  fetchShoppingList() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Ingredient[]>(
          'https://recipe-angular-b0f5b-default-rtdb.europe-west1.firebasedatabase.app/'+user.id+'/shopping-list.json',
        ).pipe(
          map((shoppingList) => {
            return shoppingList.map((ingredient) => {
              return {
                ...ingredient,
              };
            });
          }),
          tap((shoppingList) => {
            this.shoppingListService.setIngredients(shoppingList);
          })
        )
      })
    );
  }

  sendEmail(content) {
    let message = '';
    console.log(content);
    content.forEach(element => {
      message += element.name + ' ' + element.amount + '\n';
    });

    var templateParams = {
      user_email: this.authService.user.value.email,
      name: 'Recipe Service Book',
      message: message,
    };

  console.log(templateParams);
    emailjs.send('serviceid','templateid', templateParams, 'user_id').then(
      (res) => {
        if (res.status == 200) {
          alert('Email sent successfully');
        }
      }
    ).catch(err => console.log(err));
  } 
}

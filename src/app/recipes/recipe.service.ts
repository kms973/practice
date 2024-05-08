import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = 
    [new Recipe('Salad', 
    'This is simply a test',
    'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',[
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
    ]),
    new Recipe('Burger', 
    'Burger is great food. ok?',
    'https://assets-global.website-files.com/631b4b4e277091ef01450237/65947cd2a2c28c35b5ca6fb1_Whopper%20w%20Cheese.png',[
        new Ingredient('Buns', 1),
        new Ingredient('Meat', 20)
    ])
 ];
 constructor(private slService : ShoppingListService){

 }

 getRecipes(){
    return this.recipes.slice();
 }

 getRecipe(index:number){
    return this.recipes[index];
 }

 addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
 }

 addRecipe(recipe: Recipe){
   this.recipes.push(recipe);
   this.recipesChanged.next(this.recipes.slice());
 }

 updateRecipe(index: number, newRecipe: Recipe){
   this.recipes[index] = newRecipe;
   this.recipesChanged.next(this.recipes.slice());
 }

 deleteRecipe(index: number){
   this.recipes.splice(index, 1);
   this.recipesChanged.next(this.recipes.slice());
 }
}
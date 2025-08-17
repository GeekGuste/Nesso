import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { catchError, map, Observable, of } from 'rxjs';
import { Client, GetRecipeInput } from 'src/app/api/nesso-client-service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private api = inject(Client);

  searchRecipes(ingredients: string[]): Observable<Recipe[]> {
    return this.api.post({ingredients: ingredients} as GetRecipeInput).pipe(
      // Map the API response to the Recipe model
      map(response => response.recipes?.map(item => ({
        recipeName: item.recipeName,
        ingredients: item.ingredients,
        preparation: item.preparation,
        cookingTime: item.cookingTime
      } as Recipe)) || []),
      catchError(error => {
        console.error('Error fetching recipes:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}

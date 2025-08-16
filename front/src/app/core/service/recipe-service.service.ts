import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  // adapte selon ton env (ex. environments)
  private readonly baseUrl = 'http://localhost:8000';

  searchRecipes(ingredients: string[]): Observable<Recipe[]> {
    return of([{
      recipeName: 'Galettes de courgette rôties à la mozzarella',
      ingredients: ["2-3 courgettes",
        "farine de blé",
        "1 boule de mozzarella",
        "crème fraîche (pour servir)",
        "sel",
        "poivre"],
      preparation: '1. Préchauffer le four à 200 °C (chaleur tournante si possible).<br/>2. Laver puis râper les courgettes. Presser fortement la pulpe râpée pour éliminer un maximum d\'eau.',
      cookingTime: '30 minutes'
    }]);
  }
}

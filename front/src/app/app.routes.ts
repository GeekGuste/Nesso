import { Routes } from '@angular/router';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { RecipePlanningComponent } from './components/recipe-planning/recipe-planning.component';

export const routes: Routes = [
    { path: '', component: RecipeSearchComponent },
    { path: 'planning', component: RecipePlanningComponent }
];

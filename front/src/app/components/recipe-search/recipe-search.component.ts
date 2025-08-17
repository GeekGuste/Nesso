import { Component, inject, signal } from '@angular/core';
import { RecipeService } from '../../core/service/recipe-service.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { Recipe } from '../../core/model/recipe';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule, MarkdownModule],
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.scss'
})
export class RecipeSearchComponent {
  private fb = inject(FormBuilder);
  private api = inject(RecipeService);

  // --- FormBuilder
  form = this.fb.nonNullable.group({
    ingredientInput: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
    ingredients: this.fb.array<FormControl<string>>([]),
  });

  // --- UI state
  loading = signal(false);
  errorMsg = signal<string | null>(null);
  results = signal<Recipe[]>([]);

  get ingredientInput() { return this.form.controls.ingredientInput; }
  get ingredientsArray(): FormArray<FormControl<string>> { return this.form.controls.ingredients; }

  addIngredientByKeyword(event: Event): boolean {
    event.preventDefault();
    event.stopPropagation();
    this.addIngredient();
    return false; // Prevent default form submission
  }

  addIngredient(): void {
    const raw = this.ingredientInput.value.trim().toLowerCase();
    if (!raw || this.ingredientInput.invalid) return;

    const exists = this.ingredientsArray.controls.some(c => c.value === raw);
    if (!exists) this.ingredientsArray.push(this.fb.nonNullable.control(raw));

    this.ingredientInput.reset('');
  }

  removeIngredient(i: number): void {
    this.ingredientsArray.removeAt(i);
  }

  onSubmit(): void {
    this.errorMsg.set(null);
    this.results.set([]);

    const ingredients = this.ingredientsArray.controls.map(c => c.value);
    if (ingredients.length === 0) {
      this.errorMsg.set('Ajoutez au moins un ingrédient.');
      return;
    }

    this.loading.set(true);
    this.api.searchRecipes(ingredients).subscribe({
      next: items => { this.results.set(items); this.loading.set(false); },
      error: err => {
        this.loading.set(false);
        this.errorMsg.set(err?.error?.detail ?? 'Erreur lors de la recherche.');
      }
    });
  }
}
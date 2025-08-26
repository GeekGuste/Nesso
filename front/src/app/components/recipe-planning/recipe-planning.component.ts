import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgbDate, NgbDatepickerConfig, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetRecipePlanningInput, GetRecipePlanningOutput } from 'src/app/api/nesso-client-service';
import { RecipeService } from 'src/app/core/service/recipe-service.service';
import { MarkdownComponent, MarkdownModule } from "ngx-markdown";

type Period = 'Matin' | 'Midi' | 'Soir';

function atLeastOnePeriod(ctrl: AbstractControl): ValidationErrors | null {
  const g = ctrl as any;
  const values = Object.values<boolean>(g.value ?? {});
  return values.some(v => !!v) ? null : { periodsRequired: true };
}

function fmt(d: NgbDateStruct | null): string | null {
  if (!d) return null;
  const mm = `${d.month}`.padStart(2, '0');
  const dd = `${d.day}`.padStart(2, '0');
  return `${d.year}-${mm}-${dd}`;
}

@Component({
  selector: 'app-recipe-planning',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule, NgbDatepickerModule, MarkdownModule],
  templateUrl: './recipe-planning.component.html',
  styleUrl: './recipe-planning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NgbDatepickerI18n,
      useFactory: () =>
        new (class extends NgbDatepickerI18n {
          private WD = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
          private MS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
                        'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
          private MF = ['janvier','février','mars','avril','mai','juin',
                        'juillet','août','septembre','octobre','novembre','décembre'];
          override getWeekdayLabel(weekday: number) { return this.WD[weekday - 1]; }
          override getMonthShortName(month: number) { return this.MS[month - 1]; }
          override getMonthFullName(month: number)  { return this.MF[month - 1]; }
          override getDayAriaLabel(date: NgbDateStruct) {
            const dd = String(date.day).padStart(2, '0');
            const mm = String(date.month).padStart(2, '0');
            return `${dd}/${mm}/${date.year}`;
          }
        })()
    }
  ],
})
export class RecipePlanningComponent {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);

  constructor(config: NgbDatepickerConfig) {
    config.firstDayOfWeek = 1; // lundi
  }

  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  hoveredDate: NgbDate | null = null;

  output: GetRecipePlanningOutput | null = null;

  form = this.fb.group({
    dateRange: this.fb.group({
      from: this.fb.control<NgbDateStruct | null>(null, Validators.required),
      to:   this.fb.control<NgbDateStruct | null>(null, Validators.required),
    }),
    periods: this.fb.group({
      morning: this.fb.control(false),
      noon:    this.fb.control(false),
      evening: this.fb.control(false),
    }, { validators: atLeastOnePeriod }),
    ingredientInput: this.fb.nonNullable.control('', [Validators.minLength(2)]),
    includeIngredients: this.fb.array<FormControl<string>>([]),

    allergyInput: this.fb.nonNullable.control('', [Validators.minLength(2)]),
    allergies: this.fb.array<FormControl<string>>([]),
    origin: this.fb.nonNullable.control('')
  });

  loading = signal(false);
  errorMsg = signal<string | null>(null);

  get fDateFrom() { return this.form.controls.dateRange.controls.from; }
  get fDateTo()   { return this.form.controls.dateRange.controls.to; }
  get fPeriods()  { return this.form.controls.periods; }

  get ingredientInput() { return this.form.controls.ingredientInput; }
  get includeIngredients(): FormArray<FormControl<string>> { return this.form.controls.includeIngredients; }

  get allergyInput() { return this.form.controls.allergyInput; }
  get allergies(): FormArray<FormControl<string>> { return this.form.controls.allergies; }

   // Gestion du range ng-bootstrap (pattern officiel)
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.fDateFrom.setValue(date);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.fDateTo.setValue(date);
    } else {
      this.toDate = null;
      this.fDateTo.setValue(null);
      this.fromDate = date;
      this.fDateFrom.setValue(date);
    }
  }

  isHovered = (d: NgbDate) => this.fromDate && !this.toDate && this.hoveredDate && d.after(this.fromDate) && d.before(this.hoveredDate);
  isInside  = (d: NgbDate) => this.toDate && this.fromDate && d.after(this.fromDate) && d.before(this.toDate);
  isRange   = (d: NgbDate) => (this.fromDate && d.equals(this.fromDate)) || (this.toDate && d.equals(this.toDate)) || this.isInside(d) || this.isHovered(d);

 // Ajout d’un ingrédient voulu
  addIncludeIngredient() {
    const raw = this.ingredientInput.value.trim().toLowerCase();
    if (!raw || this.ingredientInput.invalid) return;
    if (!this.includeIngredients.controls.some(c => c.value === raw)) {
      this.includeIngredients.push(this.fb.nonNullable.control(raw));
    }
    this.ingredientInput.reset('');
  }
  removeIncludeIngredient(i: number) { this.includeIngredients.removeAt(i); }

  // Ajout d’une allergie (exclusion)
  addAllergy() {
    const raw = this.allergyInput.value.trim().toLowerCase();
    if (!raw || this.allergyInput.invalid) return;
    if (!this.allergies.controls.some(c => c.value === raw)) {
      this.allergies.push(this.fb.nonNullable.control(raw));
    }
    this.allergyInput.reset('');
  }
  removeAllergy(i: number) { this.allergies.removeAt(i); }

  // Empêcher Enter de soumettre, mais ajouter l’item
  onIngredientEnter(e: Event) {
    e.preventDefault(); e.stopPropagation(); this.addIncludeIngredient();
  }
  onAllergyEnter(e: Event) {
    e.preventDefault(); e.stopPropagation(); this.addAllergy();
  }

  // Soumission
  onSubmit() {
    this.errorMsg.set(null);
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const p = this.fPeriods.value;
    const periods: Period[] = [
      p.morning ? 'Matin' : null,
      p.noon ? 'Midi' : null,
      p.evening ? 'Soir' : null,
    ].filter(Boolean) as Period[];

    const payload = {
      givendates: `${fmt(this.fDateFrom.value)!} - ${fmt(this.fDateTo.value)!}`, // obligatoires
      perioderepas: periods.join(', '),                              // obligatoires (min 1)
      wishedingredients: this.includeIngredients.controls.map(c => c.value).join(', '),
      allergies: this.allergies.controls.map(c => c.value).join(', '),
      city: this.form.controls.origin.value?.trim() || undefined
    } as GetRecipePlanningInput;

    this.loading.set(true);
    this.recipeService.getPlanning(payload).subscribe({
      next: (res: GetRecipePlanningOutput) => {
        this.loading.set(false);
        // Traitement de la réponse à faire ici
        this.output = res;
      },
      error: err => {
        this.loading.set(false);
        this.errorMsg.set(err?.error?.detail ?? 'Erreur lors de la génération du planning.');
      }
    });
  }
}

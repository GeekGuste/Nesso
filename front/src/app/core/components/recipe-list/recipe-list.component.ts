import { Component, Input } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  @Input({ required: true }) recipes: Recipe[] = [];
}

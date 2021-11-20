import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;
  @Input() index: number;
  @Input() itemsPerPage;
  @Input() currentPage;
  @Input() searchIndexes;
  description: string;

  constructor(private recipeService: RecipeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.description = this.recipe.description.replace(/<\/?[^>]+(>|$)|&nbsp;/g, " ").substring(0, 50);
    if (this.searchIndexes.length == 0) {
     this.index = this.itemsPerPage*(this.currentPage-1) + this.index
     return;
    }

    if (this.searchIndexes.length == 1) {
      this.index = this.searchIndexes[0];
      return;
    }
    
    if (this.searchIndexes.length > 0) {
        let subArr = this.searchIndexes.slice((this.currentPage-1) * this.itemsPerPage, this.searchIndexes.length);
        let idxForward = (this.currentPage-1) * this.itemsPerPage;
         if (idxForward > 0) {
           this.index = subArr[this.index];
           return;
         }
         else {
          this.index = this.searchIndexes[this.index];
         }
    }
  }
  ngOnInit(): void {}
}

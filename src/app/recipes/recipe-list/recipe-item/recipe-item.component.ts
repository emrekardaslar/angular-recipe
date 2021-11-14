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
  @Input() searchIndex;
  @Input() searchIndexes;

  constructor(private recipeService: RecipeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchIndexes.length == 1) {
      this.index = this.searchIndex;
      return;
    }
    
    if (this.searchIndexes.length > 0) {
        this.searchIndex = this.searchIndexes[this.index];
    }

    if (this.searchIndex !== -1) {
      let idxForward = (this.currentPage-1)*this.itemsPerPage;
      if (idxForward > 0) {
        this.index = this.searchIndexes[idxForward];
        return;
      }
      this.index = this.searchIndex;
    }
      
    else {
      this.index = this.itemsPerPage*(this.currentPage-1) + this.index
    } 
  }

  ngOnInit(): void {}
}

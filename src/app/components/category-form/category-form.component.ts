import {Component, Input, OnInit} from '@angular/core';
import {Category, Image} from '../../entities/category';
import {CategoryService} from '../../services/category.service';
import {ApiResponse} from '../../shared/api-response';
import {PagedResponse} from '../../entities/paged-response';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Input()
  public category: Category;

  public categories: Category[] = [];

  constructor(private service: CategoryService) {
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        (response: ApiResponse<PagedResponse<Category>>) => {
          this.categories = response.data.data || [];
        }
      );
  }

  public categoryImage(event: string) {
    if (!this.category.image) {
      this.category.image = {name: event} as Image;
    } else {
      this.category.image.name = event;
    }
  }

  public byId(cat1: any, cat2: any): boolean {
    return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
  }

}

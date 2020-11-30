import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {orderBy, SortDescriptor, State} from '@progress/kendo-data-query';
import {ModalService} from '../../services/modal.service';
import {Category} from '../../entities/category';
import {ApiResponse} from '../../shared/api-response';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('catForm', {static: true})
  public form: TemplateRef<any>;

  public gridData: any;

  public sort: SortDescriptor[] = [
    {
      field: 'name',
      dir: 'asc'
    }
  ];
  public gridView: any;
  public state: State = {
    skip: 0
  };

  public category: Category;

  constructor(private service: CategoryService, private modal: ModalService, private toastr: ToastrService) {
    this.gridView = {
      skip: 0,
      pageSize: 15,
      row: 30,
      height: 740,
      scroll: 'virtual',
      sortable: {
        allowUnsort: true,
        multiple: false
      }
    };

    this.category = {} as Category;
    this.gridData = {
      data: []
    };
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  public loadCategories(page = 1) {
    const url = `?page=${page}`;
    this.service.getAll(url)
      .subscribe(
        (response: ApiResponse<any>) => {
          this.gridData = response.data;
          console.log(this.gridData);
        }
      );
  }

  public categoryForm(category: Category = {} as Category) {
    this.category = category;
    this.modal.open(this.form, 'modal-lg');
  }

  public close() {
    this.modal.close();
  }

  public save() {
    if (!this.category.parent) {
      delete this.category.parent;
    }

    if (this.category.id > 0) {

      const subscription$ = this.service.patch('/' + this.category.id, this.category).subscribe(
        (response: ApiResponse<Category>) => {
          subscription$.unsubscribe();
          this.gridData.data = this.gridData.data.map(data => {
            if (data.id === this.category.id) {
              return response.data;
            }
            return data;
          });
          this.close();
          this.toastr.success(response.message || 'Successfully updated.');
        },
        (error: ApiResponse<Category>) => {
          subscription$.unsubscribe();
        }
      );
    } else {
      const subscription$ = this.service.create(this.category).subscribe(
        (response: ApiResponse<Category>) => {
          subscription$.unsubscribe();
          this.gridData.data.push(response.data);
          this.close();
          this.toastr.success(response.message || 'Successfully created.');
        },
        (error: ApiResponse<Category>) => {
          subscription$.unsubscribe();
          this.toastr.error(error.message || 'An anexpected error has occurerd.');
        }
      );
    }
  }

  public deleteCategory(category: Category) {
    const subscription$ = this.service.delete(category.id)
      .subscribe(
        (response: ApiResponse<Category>) => {
          subscription$.unsubscribe();
          if (response.status === 200) {
            this.gridData.data = this.gridData.data.filter(data => data.id !== category.id);
            this.toastr.success(response.message || 'Successfully deleted.');
          } else {
            this.toastr.error(response.message);
          }
        },
        (error: ApiResponse<Category>) => {
          subscription$.unsubscribe();
          this.toastr.error(error.message || 'An anexpected error has occurerd.');
        }
      );
  }

  public ngOnInit() {
    this.loadCategories();
  }
}

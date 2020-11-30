import {OrdersComponent} from './components/order/active-order/orders.component';
import {AuthGuard} from './services/auth-guard.service';
import {VendorLlistComponent} from './components/vendor/vendor-llist/vendor-llist.component';
import {EmployeeListComponent} from './components/employee/list/list.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from './components/products/products.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {CustomersComponent} from './components/customers/customers.component';
import {RolesComponent} from './components/roles/roles.component';
import {PermissionsComponent} from './components/permissions/permissions.component';
import {VendorReportComponent} from './components/report/vendor-report/vendor-report.component';
import {ProductReportComponent} from './components/report/product-report/product-report.component';
import {CategoryReportComponent} from './components/report/category-report/category-report.component';
import {OrderReportComponent} from './components/report/order-report/order-report.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    children: [
      {
        path: '',
        component: EmployeeListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'vendors',
    children: [
      {
        path: '',
        component: VendorLlistComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':type',
        component: VendorLlistComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'orders',
    children: [
      {
        path: ':type',
        component: OrdersComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'customers',
    children: [
      {
        path: 'users',
        component: CustomersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'guests/:type',
        component: CustomersComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':type',
        component: ProductsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'reports',
    children: [
      {
        path: 'vendors',
        component: VendorReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sales',
        component: OrderReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'categories',
        component: CategoryReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'products',
        component: ProductReportComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

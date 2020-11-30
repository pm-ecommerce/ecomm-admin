import { ChartsModule } from '@progress/kendo-angular-charts';
import { RequestInterceptor } from './services/request-interceptor.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { VendorService } from './services/vendor.service';
import { ProductService } from './services/product.service';
import { RolesService } from 'src/app/services/roles.service';
import { PermissionsService } from './services/permissions.service';
import { AuthService } from './services/login.service';
import { PermissionFormComponent } from './components/permissions/permission-form/permission-form.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee/list/list.component';
import { AppErrorHandler } from './shared/app-error-handler';
import { EmployeeService } from './services/employee/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VendorLlistComponent } from './components/vendor/vendor-llist/vendor-llist.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ProductsComponent } from './components/products/products.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { PipeModule } from './pipes/pipe.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CategoriesComponent } from './components/categories/categories.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { RoleFormComponent } from './components/roles/role-form/role-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AwsUploadComponent } from './components/aws-upload/aws-upload.component';
import { LoginComponent } from './components/login/login/login.component';
import { AdminProfileComponent } from './components/common/admin-profile/admin-profile.component';
import { OrderReportComponent } from './components/report/order-report/order-report.component';
import { ProductReportComponent } from './components/report/product-report/product-report.component';
import { CategoryReportComponent } from './components/report/category-report/category-report.component';
import { VendorReportComponent } from './components/report/vendor-report/vendor-report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/order/active-order/orders.component';
import { ViewOrderDetailsComponent } from './components/order/view-order-details/view-order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    VendorLlistComponent,
    ProductsComponent,
    CategoriesComponent,
    CustomersComponent,
    RolesComponent,
    PermissionsComponent,
    RoleFormComponent,
    CategoryFormComponent,
    AwsUploadComponent,
    PermissionFormComponent,
    LoginComponent,
    AdminProfileComponent,
    OrderReportComponent,
    ProductReportComponent,
    CategoryReportComponent,
    VendorReportComponent,
    DashboardComponent,
    OrdersComponent,
    ViewOrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule,
    InputsModule,
    DateInputsModule,
    LabelModule,
    GridModule,
    DropDownsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    PipeModule,
  ],
  providers: [
    EmployeeService,
    AuthService,
    PermissionsService,
    RolesService,
    ProductService,
    VendorService,
    AuthGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

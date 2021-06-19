import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { AddEditDepComponent } from './department/add-edit-dep/add-edit-dep.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import lazyLoading
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { UploadComponent } from './employee/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    ShowDepComponent,
    AddEditDepComponent,
    EmployeeComponent,
    ShowEmpComponent,
    AddEditEmpComponent,
    HomeComponent,
    AdminComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    RouterModule.forRoot([
      // {
      //   path: '',
      //   redirectTo: '/',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'home',
      //   component: HomeComponent,
      // },
      // { path: 'upload', component: UploadComponent },
      // {
      //   path: 'admin',
      //   component: AdminComponent,
      //   children: [
      //     { path: 'employee', component: EmployeeComponent },
      //     { path: 'department', component: DepartmentComponent },
      //   ],
      // },
      // {
      //   path: '**',
      //   redirectTo: '',
      //   pathMatch: 'full',
      // },
    ]),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}

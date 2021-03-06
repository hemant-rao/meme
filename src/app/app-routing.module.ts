import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { UploadComponent } from './employee/upload/upload.component';

const routes: Routes = [
  // {path:'admin/employee',component:EmployeeComponent},
  // {path:'admin/department',component:DepartmentComponent},
  {
    path: "",
    redirectTo: "/",
    pathMatch: 'full' 
  },
  { path: 'upload', component: UploadComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'employee', component: EmployeeComponent },
      { path: 'department', component: DepartmentComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

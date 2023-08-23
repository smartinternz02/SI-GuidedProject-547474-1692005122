import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { LoginComponent } from './component/login/login.component';
import { AddListComponent } from './admin/add-list/add-list.component';
import { AllListComponent } from './admin/all-list/all-list.component';
import { AllBookingsComponent } from './admin/all-bookings/all-bookings.component';
import { BookComponent } from './component/book/book.component';
import { Dash1Component } from './admin/dash1/dash1.component';
import { HomeComponent } from './component/home/home.component';
import { ListComponent } from './component/list/list.component';
import { UserbookingsComponent } from './component/userbookings/userbookings.component';
import { DashComponent } from './component/dash/dash.component';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AdminDash2Component } from './admin/admin-dash2/admin-dash2.component';
import { AdminBookingsComponent } from './admin/admin-bookings/admin-bookings.component';
import { EditComponent } from './admin/edit/edit.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'add-list',component:AddListComponent},
  {path:'all-list',component:AllListComponent},
  {path:'booking',component:AllBookingsComponent},
  {path:'all-users',component: AllUsersComponent},
  {path:'book',component:BookComponent},
  {path:'dash1',component:Dash1Component},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'list',component:ListComponent},
  {path:'userbooking',component:UserbookingsComponent},
  {path:'dash',component:ListComponent},
  {path:'admin/dashboard',component:Dash1Component},
  {path:'admin/login',component:AdminLoginComponent},
  {path:'admin/register',component:AdminRegisterComponent},
  {path:'admin-dash2',component:AdminDash2Component},
  {path:'admin-bookings',component:AdminBookingsComponent},
  {path:'edit',component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

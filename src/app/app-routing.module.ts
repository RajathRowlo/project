import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AlldishComponent } from './alldish/alldish.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreatedishComponent } from './createdish/createdish.component';
import { DishComponent } from './dish/dish.component';
import { EditComponent } from './edit/edit.component';
import { EditdishComponent } from './editdish/editdish.component';
import { LoginComponent } from './login/login.component';
import { PortComponent } from './port/port.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"registration", component:RegistrationComponent},
  {path:"userdashboard", component:UserdashboardComponent,children:[
    {path:"cart", component:CartComponent},
    {path:"alldish", component:AlldishComponent},
    {path:"checkout", component:CheckoutComponent},
    {path:"", redirectTo:"alldish", pathMatch:"full"}
  ]},
  {path:"admindashboard", component:AdmindashboardComponent, children:[
    {path:"port", component:PortComponent},
    {path:"createdish", component:CreatedishComponent},
    {path:"dish", component:DishComponent},
    {path:"", redirectTo:"port", pathMatch:"full"},
    {path:"editdish/:username/:dishid", component:EditdishComponent},
  ]},
  {path:"edit", component:EditComponent},
 
 
  
 
  {path:"", redirectTo:"/login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

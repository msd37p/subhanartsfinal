import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminaddproductComponent } from './adminaddproduct/adminaddproduct.component';
import { AdmindataComponent } from './admindata/admindata.component';
import { AdmineditproductComponent } from './admineditproduct/admineditproduct.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminremoveproductComponent } from './adminremoveproduct/adminremoveproduct.component';
import { CartComponent } from './cart/cart.component';
import { CatagoryComponent } from './catagory/catagory.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'catagory/:catagory',
    component: CatagoryComponent
  },
  {
    path: 'product/:id',
    component: ProductdetailsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/addproduct',
    component: AdminaddproductComponent
  },
  {
    path: 'admin/removeproduct',
    component: AdminremoveproductComponent
  },
  {
    path: 'admin/editproduct',
    component: AdmineditproductComponent
  },
  {
    path: 'admin/data',
    component: AdmindataComponent
  },
  {
    path: 'adminlogin',
    component: AdminloginComponent
  }
];

RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

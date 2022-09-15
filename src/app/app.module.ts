import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CatagoryComponent } from './catagory/catagory.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminaddproductComponent } from './adminaddproduct/adminaddproduct.component';
import { AdminremoveproductComponent } from './adminremoveproduct/adminremoveproduct.component';
import { AdmineditproductComponent } from './admineditproduct/admineditproduct.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdmindataComponent } from './admindata/admindata.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CatagoryComponent,
    ProductdetailsComponent,
    CartComponent,
    AdminComponent,
    AdminaddproductComponent,
    AdminremoveproductComponent,
    AdmineditproductComponent,
    AdmindataComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

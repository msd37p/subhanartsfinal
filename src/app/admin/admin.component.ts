import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: AdminserviceService, private router: Router, private productservice: ProductserviceService) { }

  ngOnInit(): void {
    this.service.isAdmin().subscribe((res:any)=>{
      this.res = res
      if(!this.res){
        this.router.navigateByUrl('/adminlogin')
      }
      console.log(res)
    })
    const cartitems: any = localStorage.getItem('sacart')
    if (cartitems) {
      const arryofascart = JSON.parse(cartitems)
      this.cart = arryofascart.length
      console.log(this.cart)
    }
    this.loading = true
  this.productservice.getOrders().subscribe((res:any)=>{
      this.orders = res
      this.loading = false
  })
  }
  cart = '0'
  res = false
  orders = [{
    name: '',
    email: '',
    phonenumber: '',
    quantity: '',
    productname: '',
    productcatagory: '',
    productsubcatagory: '',
    productid: '',
    date: ''
  }]
  loading = false
  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }

}


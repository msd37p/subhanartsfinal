import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-admindata',
  templateUrl: './admindata.component.html',
  styleUrls: ['./admindata.component.css']
})
export class AdmindataComponent implements OnInit {

  constructor(private service: ProductserviceService, private router: Router, private aservice: AdminserviceService) { }

  ngOnInit(): void {
    this.aservice.isAdmin().subscribe((res:any)=>{
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
    this.service.getProductsAll().subscribe((res:any)=>{
      console.log(res)
      this.products = res
      this.products.map((e)=>{
        console.log(e.price)
        this.price = this.price + e.price * e.quantity
        this.quantity = this.quantity + e.quantity
        this.avg = this.price / this.quantity
      })
      console.log('Total',this.price)
      this.loading = false
    })
    
  }
  cart = '0'
  products = [{
    price: 0,
    quantity: 0
  }]
  res = false
  price = 0
  quantity = 0
  avg = 0

  loading = true
  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }

}

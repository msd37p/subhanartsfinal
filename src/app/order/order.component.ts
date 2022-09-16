import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private service: ProductserviceService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(params => {
      let id = params['id']
      this.id = id
    })
    const cartitems: any = localStorage.getItem('sacart')
    if (cartitems) {
      const arryofascart = JSON.parse(cartitems)
      this.cart = arryofascart.length
      console.log(this.cart)
    }
    console.log(this.id)

  }

  id = ''
  cart = '0'
  loading = false
  name = ''
  email = ''
  phonenumber = ''
  quantity = ''

  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }
  submit(){
    if(this.name === ''){
      alert('Please Enter Your Name')
      return
    }
    if(this.email === ''){
      alert('Please Enter Your Email')
      return
    }
    if(this.phonenumber === ''){
      alert('Please Enter Your Phone Number')
      return
    }
    if(this.quantity === ''){
      alert('Please Enter Quantity')
      return
    }
    // console.log(this.name, this.email, this.phonenumber, this.quantity)
    this.loading = true
    this.service.order({
      name: this.name,
      email: this.email,
      phonenumber: this.phonenumber,
      quantity: this.quantity,
      productid: this.id
    }).subscribe((res: any)=>{
      alert(res)
      this.loading = false
      window.history.back()
    })
  }

}

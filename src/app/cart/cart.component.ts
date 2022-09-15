import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service: ProductserviceService) { }

  ngOnInit(): void {
    this.loading = true
    this.cartItems = []
    const localstorage = localStorage.getItem('sacart')
    if (!localstorage) {
      console.log('No local storage!')
      return
    }
    const cart: [] = JSON.parse(localstorage)
    this.cart = cart.length
    if (cart.length == 0) {
      console.log('Cart empty')
      return
    }
    cart.map((i: any) => {
      this.service.getProduct(i.id).subscribe((res: any) => {
        if(res[0] !== null){
        this.cartItems.push(res[0])
        }
        console.log(this.cartItems)
        if (this.cartItems[0]._id === '') {
          this.cartItems.shift()
        }
        this.loading = false
      })
    })
  }
  cart = 0

  loading = true

  cartItems = [
    {
      name: '',
      price: 0,
      image: '',
      _id: ''
    }
  ]

  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }

  del(event: any) {
    const id = event.target.id
    const localstorage = localStorage.getItem('sacart')
    if(!localstorage){
      return
    }
    const cart:[] = JSON.parse(localstorage)
    const newCart = cart.filter(function(i:any){
        return i.id !== id
    })
    localStorage.setItem('sacart', JSON.stringify(newCart))
    this.ngOnInit()
  }


}

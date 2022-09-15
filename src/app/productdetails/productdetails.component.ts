
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private service: ProductserviceService) { }

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
    this.service.getProduct(this.id).subscribe((res: any) => {
      this.product = res[0]
      this.loading = false
    })


  }
  id = ''
  cart = '0'
  alert = ''
  product = {
    name: '',
    price: 0,
    catagory: '',
    subcatagory: '',
    quantity: 0,
    details: '',
    image: '',
    _id: ''
  }

  loading = true

  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }

  addCart() {
    const a = localStorage.getItem('sacart')
    const item = [{ id: this.id }]
    const itemobj = { id: this.id }
    if (!a) {
      localStorage.setItem('sacart', JSON.stringify(item))
      this.ngOnInit()
      this.alert = 'Item is added to the cart'
    }
    if (a) {
      const items = JSON.parse(a)
      const id = this.id
      const exist = items.filter(function (item: any) {
        return item.id === id
      })
      if (exist.length !== 0) {
        this.alert = 'Item is already in the cart'
      } else {
        items.push(itemobj)
        localStorage.setItem('sacart', JSON.stringify(items))
        this.ngOnInit()
        this.alert = 'Item is added to the cart'
      }
    }
  }

}


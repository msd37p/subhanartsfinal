import { Component, HostListener, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})



export class HomepageComponent implements OnInit {

  constructor(private service: ProductserviceService) { }

  ngOnInit(): void {
    this.loading = true
    const cartitems: any = localStorage.getItem('sacart')
    if (cartitems) {
      const arryofascart = JSON.parse(cartitems)
      this.cart = arryofascart.length
      console.log(this.cart)
    }
      this.service.getProducts(this.productcount).subscribe((res:any)=>{
        console.log("response is", res)
        this.products = res
        this.initialLoading = false
        this.loading = false
      })
    
  }

  loading = false
  productcount = 10
  initialLoading = true

  cart = '0'
  products = [{
    name: '',
    price: 0,
    catagory: '',
    subcatagory: '',
    quantity: 0,
    details: '',
    image: '',
    _id: ''
  }]

  currentPosition = window.pageYOffset
  @HostListener("document:scroll")
  scrollFunction() {
    if (window.scrollY >= 10) {
      document.getElementById('navbar')?.classList.add('navbar-scrolled')
      document.getElementById('nav-items')?.classList.add('nav-items-scrolled')
    } else {
      document.getElementById('navbar')?.classList.remove('navbar-scrolled')
      document.getElementById('nav-items')?.classList.remove('nav-items-scrolled')
    }
  }
  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }
  loadMore(){
    this.productcount = this.productcount + 10
    this.ngOnInit()
  }
}

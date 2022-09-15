import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private service: ProductserviceService) { }

  ngOnInit(): void {
    this.loading = true
    this.activatedroute.params.subscribe(params => {
      let catagory = params['catagory']
      this.catagory = catagory
    })
    const cartitems: any = localStorage.getItem('sacart')
    if (cartitems) {
      const arryofascart = JSON.parse(cartitems)
      this.cart = arryofascart.length
      console.log(this.cart)
    }
    setTimeout(() => {
      this.service.getProductsByCat(this.limit, this.catagory, this.subcatagory).subscribe((res:any)=>{
        this.products = res
        console.log(res)
        this.loading = false
        this.initialloading = false
      })
    }, 1000);
  }

  catagory = ''
  subcatagory = 'Unstiched'
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

  limit = 10
  loading = true

  loadClick(){
    this.limit = this.limit+1
    this.ngOnInit()
  }

  initialloading = true

  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }

  stClick(){
    this.initialloading = true
    this.subcatagory = 'Stiched'
    this.ngOnInit()
    document.getElementById('us')?.classList.remove('scactive')
    document.getElementById('s')?.classList.add('scactive')
    document.getElementById('k')?.classList.remove('scactive')
  }
  unStClick(){
    this.initialloading = true
    this.subcatagory = 'Unstiched'
    this.ngOnInit()
    document.getElementById('us')?.classList.add('scactive')
    document.getElementById('s')?.classList.remove('scactive')
    document.getElementById('k')?.classList.remove('scactive')
  }
  kidsClick(){
    this.initialloading = true
    this.subcatagory = 'Kids'
    this.ngOnInit()
    document.getElementById('us')?.classList.remove('scactive')
    document.getElementById('s')?.classList.remove('scactive')
    document.getElementById('k')?.classList.add('scactive')
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-adminaddproduct',
  templateUrl: './adminaddproduct.component.html',
  styleUrls: ['./adminaddproduct.component.css']
})
export class AdminaddproductComponent implements OnInit {

  constructor(private service: AdminserviceService, private router: Router) { }

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
  }
  cart = '0'
  res = false
  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }

  name = ''
  price: number = 0
  catagory = ''
  subcatagory = ''
  quantity: number = 0
  details = ''
  image = ''
  alert = ''
  loading = false

  imageChange(e: any) {
    const data = e.target.files[0]
    var reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image()
      image.src = e.target.result
      image.onload = rs => {
        const base64image = e.target.result
        this.image = base64image
      }
    }
    reader.readAsDataURL(data);
  }

  async addProduct() {
    if (this.image === "") {
      this.alert = 'Please add image!'
      return
    }
    if (this.name, this.catagory, this.subcatagory, this.details === '') {
      this.alert = 'Please provide all the required data!'
      console.log(this.name, this.catagory, this.subcatagory, this.details)
      return
    }
    if (this.price, this.quantity == 0) {
      console.log(this.price, this.quantity)
      this.alert = 'Please provide all the required data!'
      return
    }
    this.alert = ''
    this.loading = true
      this.service.addProduct({
        name: this.name,
        price: this.price,
        catagory: this.catagory,
        subcatagory: this.subcatagory,
        quantity: this.quantity,
        details: this.details,
        image: this.image
      }).subscribe((res:any)=>{
        this.alert = 'Item added successfully.'
        this.loading = false
        this.name = ''
        this.price = 0
        this.catagory = ''
        this.subcatagory = ''
        this.quantity = 0
        this.details = ''
        this.image = ''
      })
    
  }

  resetImg() {
    this.image = ''
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-admineditproduct',
  templateUrl: './admineditproduct.component.html',
  styleUrls: ['./admineditproduct.component.css']
})
export class AdmineditproductComponent implements OnInit {

  constructor(private service: AdminserviceService, private searchservice: ProductserviceService, private router: Router) { }

  ngOnInit(): void {
    this.service.isAdmin().subscribe((res: any) => {
      this.res3 = res
      if (!this.res3) {
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
  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }
  res3 = false

  name = ''
  price: number = 0
  catagory = ''
  subcatagory = ''
  quantity: number = 0
  details = ''
  image = ''
  alert = ''
  alert2 = ''
  loading = false
  sloading = false
  hide = true
  id = ''
  res = {
    product: {
      name: '',
      price: 0,
      catagory: '',
      subcatagory: '',
      quantity: 0,
      details: '',
      image: '',
      _id: ''
    },
    status: 0
  }

  res2 = {
    status: 200
  }
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

  async searchProduct() {
    if (this.id === '') {
      this.alert2 = 'Enter valid product code'
      return
    }
    this.alert2 = ''
    this.sloading = true
    this.searchservice.searchProduct(this.id).subscribe((res: any) => {
      this.res = res
      if (this.res.status === 200) {
        this.name = this.res.product.name
        this.price = this.res.product.price
        this.catagory = this.res.product.catagory
        this.subcatagory = this.res.product.subcatagory
        this.quantity = this.res.product.quantity
        this.details = this.res.product.details
        this.image = this.res.product.image
        this.hide = false
        this.alert2 = ''
      } else {
        this.alert2 = 'Invalid product code'
      }
      this.sloading = false
      this.id = ''
    })
  }

  async editProduct() {
    console.log(this.name)
    if (this.name === '') {
      this.alert = 'Please provide all the required data!'
      return
    }
    if (this.catagory === '') {
      this.alert = 'Please provide all the required data!'
      return
    }
    if (this.subcatagory === '') {
      this.alert = 'Please provide all the required data!'
      return
    }
    if (this.details === '') {
      this.alert = 'Please provide all the required data!'
      return
    }
    if (this.price == 0) {
      this.alert = 'Please provide all the required data!'
      return
    }
    if (this.quantity == 0) {
      this.alert = 'Please provide all the required data!'
      return
    }

    this.alert = ''
    this.loading = true
    this.service.editProduct({
      name: this.name,
      price: this.price,
      catagory: this.catagory,
      subcatagory: this.subcatagory,
      quantity: this.quantity,
      details: this.details,
      image: this.image,
      id: this.res.product._id
    }).subscribe((res: any) => {
      this.loading = false
      this.hide = true
    })

  }

  resetImg() {
    this.image = ''
  }
}

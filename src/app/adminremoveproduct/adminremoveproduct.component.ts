import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-adminremoveproduct',
  templateUrl: './adminremoveproduct.component.html',
  styleUrls: ['./adminremoveproduct.component.css']
})
export class AdminremoveproductComponent implements OnInit {

  constructor(private service: AdminserviceService) { }

  ngOnInit(): void {
    const cartitems: any = localStorage.getItem('sacart')
    if (cartitems) {
      const arryofascart = JSON.parse(cartitems)
      this.cart = arryofascart.length
      console.log(this.cart)
    }
  }
  cart = '0'
  alert = ''
  id = ''

  loading = false
  menuClick() {
    document.getElementById('navbar-responsive')?.classList.toggle('navbar-responsive-click')
    document.getElementById('sort')?.classList.toggle('sort-hide')
    document.getElementById('close')?.classList.toggle('close-show')
  }

  res = {
    status: 0
  }

  deleteProduct(){
    this.alert = ''
    if(this.id===''){
      this.alert = 'Please enter valid product code'
      return
    }
    this.loading = true
    this.service.removeProduct(this.id).subscribe((res:any)=>{
      this.res = res
      this.loading = false
      if(this.res.status === 200){
        this.alert = 'Product deleted successfully'
        return
      }
      if(this.res.status === 404){
        this.alert = 'Invalid product code'
        return
      }
    })
  }

  

}

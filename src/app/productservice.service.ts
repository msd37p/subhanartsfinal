import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private http: HttpClient) { }
  getProducts(x: any) {
    return this.http.get(`/api/products/limit?_limit=${x}`)
  }
  getProduct(x: any) {
    return this.http.get(`/api/products/id?id=${x}`)
  }
  getProductsAll() {
    return this.http.get('/api/products')
  }
  getProductsByCat(x: any, y: any, z: any) {
    return this.http.get(`/api/products/catagory?_limit=${x}&catagory=${y}&subcatagory=${z}`)
  }
  searchProduct(id: any) {
    return this.http.get(`/api/searchproduct?id=${id}`)
  }
  order(data: any){
    return this.http.post('/api/order', data)
  }
  getOrders(){
    return this.http.get('/api/orders')
  }
}

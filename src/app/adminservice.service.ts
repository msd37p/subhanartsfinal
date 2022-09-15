import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http: HttpClient) { }
  addProduct(data:any){
    return this.http.post('/api/products', data, {withCredentials: true})
  }
  removeProduct(data:any){
    return this.http.delete(`/api/products?id=${data}`, {withCredentials: true})
  }
  editProduct(data:any){
    return this.http.put(`/api/product`, {data}, {withCredentials: true})
  }
  isAdmin(){
    return this.http.post('/api/isadmin', 'hello', {withCredentials: true})
  }
  login(key:any){
    return this.http.post('/api/login', {key: key}, {withCredentials: true})
  }
}

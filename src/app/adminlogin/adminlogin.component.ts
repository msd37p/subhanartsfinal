import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private service: AdminserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  key = ""
  res = false
  submit(){
    this.service.login(this.key).subscribe((res:any)=>{
      this.res = res
      if(this.res){
        this.router.navigateByUrl('/admin')
        return
      }
      alert('Incorrect key')
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  formdata : any;

  constructor(private router:Router, private api:ApiService) { }

  ngOnInit(): void {
    if(this.api.getcookie("usertype") == "admin"){
      this.router.navigate(["./admin-home"]).then(()=>{
        window.location.reload();
      });
    }
    this.formdata = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required])),
    });
    window.scrollTo(0, 0);
  }

  onClickSubmit(data:any){
    var reqdata =  {"data" : data};
    var reply = this.api.callapi("admin/login", reqdata);
    reply.subscribe((mydata: any)=>{
      data = Array.from(Object.keys(mydata), k => mydata[k]);
      var status = data[0].status;
      if(status == "success"){
        this.api.setcookie("usertype", "admin");
        this.router.navigate(["./admin-home"]).then(()=>{
          window.location.reload();
        });
      }else{
        alert("Wrong credentials");
      }
    });
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminproductcategories',
  templateUrl: './adminproductcategories.component.html',
  styleUrls: ['./adminproductcategories.component.css']
})
export class AdminproductcategoriesComponent implements OnInit {

  data: any;

  constructor(private router:Router, private api:ApiService) { }

  ngOnInit(): void {
    this.binddata();
  }

  binddata()
  {
    var reqdata =  {"data" : {}};
    var reply = this.api.callapi("admin/productcategories", reqdata);
    reply.subscribe((mydata: any)=>{
      this.data = mydata;
    });
  }

  deletedata(id: number)
  {
    let result = confirm("Sure to Delete?");
    if(result){
      var reqdata = {"data" : {id: id}};
      var reply = this.api.callapi("admin/deleteproductcategory", reqdata);
      reply.subscribe((mydata: any)=>{
      this.binddata();
      });
    }
  }
}

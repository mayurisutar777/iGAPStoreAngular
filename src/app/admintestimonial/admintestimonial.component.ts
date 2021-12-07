import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admintestimonial',
  templateUrl: './admintestimonial.component.html',
  styleUrls: ['./admintestimonial.component.css']
})
export class AdmintestimonialComponent implements OnInit {
  id = 0;
  formdata: any;
  name = "";
  qualification = "";
  message = "";
  image = "";

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if(this.id != 0)
    {
      //Read data from api - Edit mode
      var reqdata = {"data" : {id: this.id}};
      var reply = this.api.callapi("admin/testimonial", reqdata);
      reply.subscribe((mydata: any)=>{
        let data = Array.from(Object.keys(mydata), k=>mydata[k]);
        this.name = data[0].name;
        this.qualification = data[0].qualification;
        this.message = data[0].message;
        this.image = "";
        this.binddata();
      });
    }
    else{
      this.binddata();
    }
    window.scrollTo(0, 0);
  }

  binddata()
  {
    this.formdata = new FormGroup({
      id: new FormControl(this.id, Validators.compose([Validators.required])),
      name: new FormControl(this.name, Validators.compose([Validators.required])),
      qualification: new FormControl(this.qualification, Validators.compose([Validators.required])),
      message: new FormControl(this.message, Validators.compose([Validators.required])),
      image: new FormControl("", Validators.compose([])),
    });
  }

  onClickSubmit(data:any){
    data.image = this.image;
    var reqdata = {"data" : data};
    var reply = this.api.callapi("admin/savetestimonial", reqdata);
    reply.subscribe((mydata: any)=>{
      data = Array.from(Object.keys(mydata), k=>mydata[k]);
      var status = data[0].status;
      if(status == "success"){
        this.router.navigate(["./admin-testimonials"]).then(()=>{
          window.location.reload();
        });
      }
      else{
        alert("Something went wrong.");
      }
    });
  }

  handleUpload(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null)
        this.image = reader.result.toString();
    }
  }
}

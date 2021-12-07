import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminslider',
  templateUrl: './adminslider.component.html',
  styleUrls: ['./adminslider.component.css']
})
export class AdminsliderComponent implements OnInit {
  id = 0;
  formdata: any;
  smalltitle = "";
  title = "";
  description = "";
  linktopen = "";
  image = "";

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if(this.id != 0)
    {
      //Read data from api - Edit mode
      var reqdata = {"data" : {id: this.id}};
      var reply = this.api.callapi("admin/slider", reqdata);
      reply.subscribe((mydata: any)=>{
        let data = Array.from(Object.keys(mydata), k=>mydata[k]);
        this.smalltitle = data[0].smalltitle;
        this.title = data[0].title;
        this.description = data[0].description;
        this.linktopen = data[0].linktopen;
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
      smalltitle: new FormControl(this.smalltitle, Validators.compose([Validators.required])),
      title: new FormControl(this.title, Validators.compose([Validators.required])),
      description: new FormControl(this.description, Validators.compose([Validators.required])),
      linktopen: new FormControl(this.linktopen, Validators.compose([Validators.required])),
      image: new FormControl("", Validators.compose([])),
    });
  }

  onClickSubmit(data:any){
    data.image = this.image;
    var reqdata = {"data" : data};
    var reply = this.api.callapi("admin/saveslider", reqdata);
    reply.subscribe((mydata: any)=>{
      data = Array.from(Object.keys(mydata), k=>mydata[k]);
      var status = data[0].status;
      if(status == "success"){
        this.router.navigate(["./admin-sliders"]).then(()=>{
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  //baseURL = "https://igapstoreadmin.igaptechnologies.com/";
  baseURL = "http://localhost:8082/";

  constructor(private http:HttpClient, private cookie: CookieService) { }

  callapi(api:string, data:any){
      const headers = {'content-type': 'application/json'}
      const body = JSON.stringify(data);
      return this.http.post(this.baseURL + api, body, {'headers':headers});
  }

  setcookie(name:string, value:string){
    this.cookie.set(name, value,2);
  }
  getcookie(name:string){
    if(this.cookie.get(name) == null)
      return "";
    else
      return this.cookie.get(name);
    
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  path= "http://localhost:9091/auth/authenticate"
  constructor(private client:HttpClient) { }
 
  login(user:LoginUser){
    console.log("Inservice")
    console.log(user)
    return this.client.post(this.path,user,{responseType:'text'})
  }

  register(user: { name: string; password: string; email: string; roles: string }) {
    return this.client.post('http://localhost:9091/auth/new', user, { responseType: 'text' });
  }
}
export class LoginUser{
  name:string;
  password:string;
}
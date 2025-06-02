import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent  {
  constructor(private router:Router, private logService:LoginService){}
  selectedRole: string = 'admin';
  email: string = '';
  password: string = '';

  token: string;
  onSubmit(form: NgForm): any {
    if (form.valid) {
      console.log('Form Submitted', {
        role: this.selectedRole,
        email: this.email,
        password: this.password
      });
    } else {
      console.log('Form is invalid. Please check all fields.');
    }
    console.log("validate function calling.......");
    console.log(form.value)
    this.logService.login(form.value).subscribe(response => {console.log("JWT"+response)})
  }
  
  
  
   //validate(form:NgForm):any{
   //}
}

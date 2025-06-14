import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { jwtDecode } from 'jwt-decode'; 

@Component({
  selector: 'login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router, private logService: LoginService) {}
  selectedRole: string = 'admin';
  password: string = '';
  token: string;

  onSubmit(form: NgForm): any {
    if (!form.valid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.logService.login(form.value).subscribe(response => {
      // Store JWT token
      console.log("Response from login service: ", response);
      sessionStorage.setItem('jwt', response);

      // Decode JWT and extract roles
      try {
        const decoded: any = jwtDecode(response);
        console.log('Decoded JWT:', decoded);
        if (decoded && decoded.roles) {
          sessionStorage.setItem('roles', JSON.stringify(decoded.roles));
          // Show alert based on roles
          if (decoded.roles.includes('admin')) {
            alert('You are logged in as an Admin.');
          } else if (decoded.roles.includes('employee')) {
            alert('You are logged in as an Employee.');
          } else {
            alert('You are logged in with unknown roles.');
          }
        } else {
          sessionStorage.removeItem('roles');
          alert('Login successful, but roles are not defined.');
        }
      } catch (e) {
        sessionStorage.removeItem('roles');
        alert('Login successful, but failed to decode roles.');
      }

      // Navigate to landing page
      this.router.navigate(['/']);
    });
  }
}




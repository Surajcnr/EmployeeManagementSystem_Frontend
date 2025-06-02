import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  employeeId: string = '';
  name: string = '';
  email: string = '';
  department: string = '';
  role: string = '';

  departments: string[] = [
    "Administration", "Human Resources (HR)", "Accounting", "Marketing", "Sales",
    "Information Technology (IT)", "Customer Service / Support", "Research & Development (R&D)",
    "Product Management", "Logistics", "Design / Creative", "Project Management Office (PMO)"
  ];

  roles: string[] = [
    "Intern", "Assistant", "Coordinator", "Specialist", "Clerk", 
    "Administrator", "Business Analyst", "Data Analyst", "Team Lead", "Supervisor"
  ];

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Registration Submitted', {
        employeeId: this.employeeId,
        name: this.name,
        email: this.email,
        department: this.department,
        role: this.role
      });
      // Implement API call or further processing here
    } else {
      console.log('Form is invalid.');
    }
  }
}



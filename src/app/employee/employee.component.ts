import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service'; // Import your login service
import { EmailService } from '../email.service'; // Import EmailService

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  showRegisterCard = false;
  showSearchCard = false;
  editMode = false;
  originalEmployee: Employee | null = null;
  registerPassword: string = '';

  // Form model
  newEmployee: Employee = {
    employeeId: null,
    name: '',
    department: '',
    role: '',
    contactDetails: ''
  };

  // For search
  searchEmployeeId: number | null = null;
  searchedEmployee: Employee | null = null;
  searchError: string = '';

  departments = [
    'Administration', 'Human Resources (HR)', 'Finance', 'Accounting',
    'Marketing', 'Sales', 'Information Technology (IT)'
  ];
  roles = [
    'Intern', 'Assistant', 'Coordinator', 'Specialist', 'Clerk',
    'Administrator', 'Analyst', 'Team Lead'
  ];

  constructor(
    private employeeService: EmployeeService,
    private loginService: LoginService, // Inject login service
    private emailService: EmailService // Inject EmailService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  get isEmployee(): boolean {
    const roles = sessionStorage.getItem('roles');
    if (!roles) return false;
    try {
      const rolesArray = JSON.parse(roles);
      return Array.isArray(rolesArray) ? rolesArray.includes('employee') : rolesArray === 'employee';
    } catch {
      return false;
    }
  }

  getEmployees() {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleRegisterCard() {
    this.showRegisterCard = !this.showRegisterCard;
    if (this.showRegisterCard) this.showSearchCard = false;
  }

  toggleSearchCard() {
    this.showSearchCard = !this.showSearchCard;
    if (this.showSearchCard) this.showRegisterCard = false;
    this.searchedEmployee = null;
    this.searchError = '';
  }

  searchEmployee() {
    this.searchedEmployee = null;
    this.searchError = '';
    this.editMode = false;
    if (!this.searchEmployeeId) return;
    this.employeeService.getEmployeeById(this.searchEmployeeId).subscribe({
      next: (emp) => {
        this.searchedEmployee = { ...emp };
        this.originalEmployee = { ...emp };
      },
      error: () => {
        this.searchError = 'Employee not found.';
      }
    });
  }

  registerEmployee() {
    this.employeeService.registerEmployee(this.newEmployee).subscribe({
      next: () => {
        const loginUser = {
          name: this.newEmployee.name,
          password: this.registerPassword,
          email: this.newEmployee.contactDetails,
          roles: 'employee'
        };
        this.loginService.register(loginUser).subscribe({
          next: () => {
            this.getEmployees();

            // Prepare email details
            const recipient = this.newEmployee.contactDetails;
            const msgBody = `username: ${this.newEmployee.name}, password: ${this.registerPassword}`;
            const subject = 'Login credentials';

            // Debugging: Log values to ensure they are correct
            console.log('New Employee:', this.newEmployee);
            console.log('Register Password:', this.registerPassword);
            console.log('Recipient:', recipient);
            console.log('Message Body:', msgBody);
            console.log('Subject:', subject);

            // Send email to the new employee
            this.emailService.sendEmail(recipient, msgBody, subject).subscribe({
              next: () => {
                alert('Email sent successfully!');
              },
              error: (err) => {
                console.error('Failed to send email:', err);
                alert('Failed to send email.');
              }
            });

            this.resetForm();
            this.registerPassword = '';
            alert('Employee registered and user created!');
          },
          error: () => {
            alert('Employee registered, but user creation failed!');
          }
        });
      },
      error: () => {
        alert('Registration failed!');
      }
    });
  }

  resetForm() {
    this.newEmployee = {
      employeeId: null,
      name: '',
      department: '',
      role: '',
      contactDetails: ''
    };
    this.registerPassword = '';
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          this.searchedEmployee = null;
          this.getEmployees();
        },
        error: () => {
          alert('Delete failed!');
        }
      });
    }
  }

  updateEmployee() {
    if (this.searchedEmployee) {
      this.employeeService.updateEmployee(this.searchedEmployee).subscribe({
        next: () => {
          this.editMode = false;
          this.getEmployees();
        },
        error: () => {
          alert('Update failed!');
        }
      });
    }
  }

  cancelEdit() {
    if (this.originalEmployee) {
      this.searchedEmployee = { ...this.originalEmployee };
    }
    this.editMode = false;
  }
}

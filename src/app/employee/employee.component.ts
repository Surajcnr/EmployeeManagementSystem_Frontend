import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  showRegisterCard = true;
  showSearchCard = false;
  editMode = false;
  originalEmployee: Employee | null = null;

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

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
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
        this.getEmployees();
        this.resetForm();
      },
      error: (err) => {
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

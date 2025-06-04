import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  employeeId: number;
  name: string;
  contactDetails: string;
  department: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:9091/employeeprofiles/fetchAll'; 

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  registerEmployee(employee: Employee) {
    return this.http.post(this.apiUrl.replace('/fetchAll', '/save'), employee);
  }

  getEmployeeById(employeeId: number) {
    return this.http.get<Employee>(`http://localhost:9091/employeeprofiles/fetchById/${employeeId}`);
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(`http://localhost:9091/employeeprofiles/deleteById/${employeeId}`);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(
      `http://localhost:9091/employeeprofiles/update/${employee.employeeId}`,
      employee
    );
  }
}

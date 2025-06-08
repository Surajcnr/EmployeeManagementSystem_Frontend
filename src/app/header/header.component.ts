import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('jwt');
  }

  get isAdmin(): boolean {
    const roles = sessionStorage.getItem('roles');
    if (!roles) return false;
    try {
      const rolesArray = JSON.parse(roles);
      return Array.isArray(rolesArray) ? rolesArray.includes('admin') : rolesArray === 'admin';
    } catch {
      return false;
    }
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

  logout() {
    sessionStorage.clear();
    window.location.href = '/'; // reload to reset state
  }
}

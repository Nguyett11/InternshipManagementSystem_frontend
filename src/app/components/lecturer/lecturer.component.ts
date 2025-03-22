import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lecturer',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.css'
})
export class LecturerComponent {
  
   constructor(private router: Router, private userService : UserService ) {}
  
   ngOnInit(): void {}

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        console.log('Logout successful.');
        this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
}

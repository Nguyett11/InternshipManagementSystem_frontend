import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../responses/user/user.response';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-profile',
  standalone: true,
  imports: [],
  templateUrl: './button-profile.component.html',
  styleUrl: './button-profile.component.css'
})
export class ButtonProfileComponent implements OnInit{
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  constructor(
    private userService: UserService,
    //private popoverConfig: NgbPopoverConfig,  
    private tokenService: TokenService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }
  handleItemClick(index: number): void {
    switch (index) {
      case 0:
        debugger
        this.router.navigate(['/user-profile']);
        break;
      case 1:
        this.userService.removeUserFromLocalStorage();
        this.tokenService.removeToken();
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        break;
      default:
        console.warn('Unhandled index:', index);
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item
  }

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

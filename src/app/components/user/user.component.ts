import { Component } from '@angular/core';
import { ButtonProfileComponent } from "../button-profile/button-profile.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ButtonProfileComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}

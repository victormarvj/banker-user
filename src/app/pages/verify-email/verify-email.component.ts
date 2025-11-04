import { Component, OnInit } from '@angular/core';
import { EmailPinComponent } from './email-pin/email-pin.component';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [EmailPinComponent],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  constructor(private userService: UserService) {}

  userData: any;

  ngOnInit(): void {
    this.userData = this.userService.getAuthenticatedUserStorage;
    if (this.userData?.email) {
      let userEmail = this.userData.email;
      this.email = userEmail.substring(0, 6) + '*****';
    }
  }
}

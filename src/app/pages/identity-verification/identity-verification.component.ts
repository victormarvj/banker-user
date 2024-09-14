import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-identity-verification',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './identity-verification.component.html',
  styleUrl: './identity-verification.component.scss',
})
export class IdentityVerificationComponent {
  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  logOut() {
    this.userService.logOut().subscribe((res) => {
      this.snackBarService.success(res.message);
    });
    this.userService.revokeAuthStorage();
  }
}

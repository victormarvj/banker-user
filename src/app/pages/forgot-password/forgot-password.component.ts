import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, JsonPipe, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  isLoading = false;

  email: string = '';

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  submitForm() {
    const formData = {
      email: this.email,
    };

    this.isLoading = true;

    this.userService.forgotPassword(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBarService.success(res.message);
        this.email = '';
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error.error);
        this.email = '';
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;

  isLoading: boolean = false;
  preloader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {
    this.signinForm = this.fb.group({
      access_id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.isAuthUserSignal();
  }

  submitForm() {
    if (this.signinForm.valid) {
      const formData = this.signinForm.value;
      this.userService.getCrsfToken().subscribe((res) => {
        this.userService.login(formData).subscribe({
          next: (res) => {
            // console.log(res);
            this.userService.setUserSignal(res);

            this.userService.isAuthUserSignal();
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.log(err);
            this.snackBarService.error(err.error.error);
          },
        });
      });
    } else {
      this.snackBarService.error('Form is invalid');
    }
  }
}

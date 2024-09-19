import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { isPlatformBrowser, JsonPipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  // isBrowser: any;
  // constructor(@Inject(PLATFORM_ID) private platformId: any) {
  //   this.isBrowser(isPlatformBrowser(this.platformId));
  // }

  securityForm!: FormGroup;
  profileForm!: FormGroup;

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      fullname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      postal_code: ['', Validators.required],
    });

    this.securityForm = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  isLoading: boolean = false;
  userData: any;

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserDetails().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.userService.updateUserSignal(res.user);
        this.userData = this.userService.getAuthenticatedUserStorage;

        this.profileForm.patchValue({
          fullname: this.userData?.fullname,
          phone: this.userData?.phone,
          email: this.userData?.email,
          city: this.userData?.city,
          dob: this.userData?.dob,
          country: this.userData?.country,
          address: this.userData?.address,
          postal_code: this.userData?.postal_code,
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }

  submitProfileForm() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;

      this.isLoading = true;
      this.userService.updateProfile(formData).subscribe({
        next: (res) => {
          this.securityForm.reset();
          this.isLoading = false;
          this.userService.updateUserSignal(res.user);
          this.userData = this.userService.getAuthenticatedUserStorage;
          this.snackBarService.success('User data updated successfully');
        },
        error: (err) => {
          this.securityForm.reset();
          this.isLoading = false;
          console.log(err);
          this.snackBarService.error(err.error.error);
        },
      });
    } else {
      console.log('Invalid form');
    }
  }

  submitSecurityForm() {
    if (this.securityForm.valid) {
      const formData = this.securityForm.value;
      this.isLoading = true;
      this.userService.changePassword(formData).subscribe({
        next: (res) => {
          this.securityForm.reset();
          this.isLoading = false;
          this.snackBarService.success(res.message);
        },
        error: (err) => {
          this.securityForm.reset();
          this.isLoading = false;
          console.log(err);
          this.snackBarService.error(err.error.error);
        },
      });
    } else {
      console.log('Invalid form');
    }
  }
}

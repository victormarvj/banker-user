import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
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
import { finalize } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../../../services/file-upload.service';
import { environment } from '../../../../environment';

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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  securityForm!: FormGroup;
  profileForm!: FormGroup;
  isLoading: boolean = false;
  userData: any;
  profileImagePreview: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;
  interval: any;

  apiRootUrl: string = environment.apiRootUrl;

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
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
      pic: [''],
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

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserDetails().subscribe({
      next: (res) => {
        console.log(res);
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
          pic: this.userData?.pic,
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }

  onFileUpload(event: Event): void {
    this.isLoading = true;
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);
      this.uploadProgress = 0;

      this.fileUploadService.uploadImage(formData).subscribe({
        next: (res) => {
          // Start the interval to increment the progress bar
          this.interval = setInterval(() => {
            this.uploadProgress += 20;

            if (this.uploadProgress >= 100) {
              this.uploadProgress = 100; // Ensure it caps at 100
              this.clearUploadProgressInterval();
              this.profileForm.get('pic')?.setValue(res.url);
              this.isLoading = false;
              this.snackBarService.success(
                'Profile image uploaded successfully'
              );
            }
          }, 500); // Increment every 1 second
        },
        error: (err) => {
          this.snackBarService.error(err);
          this.clearUploadProgressInterval(); // Clear interval on error
        },
      });
    }
  }

  // Clear the interval function
  clearUploadProgressInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // Cleanup interval when component is destroyed
  ngOnDestroy(): void {
    this.clearUploadProgressInterval();
  }

  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.uploadImage(file);
  //   }
  // }

  // uploadImage(file: File) {
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   this.uploadProgress = 0;
  //   this.isLoading = true;

  //   this.fileUploadService
  //     .uploadImage(formData)
  //     .pipe(
  //       finalize(() => {
  //         this.isLoading = false;
  //         this.uploadProgress = 0;
  //       })
  //     )
  //     .subscribe({
  //       next: (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.uploadProgress = Math.round(
  //             (100 * event.loaded) / event.total!
  //           );
  //         } else if (event.type === HttpEventType.Response) {
  //           // Assuming the response contains the URL of the uploaded image
  //           const imageUrl = event.body.url;
  //           this.userData.pic = imageUrl;
  //           this.profileForm.get('pic')?.setValue(imageUrl);
  //           this.snackBarService.success('Profile image uploaded successfully');
  //         }
  //       },
  //       error: (err: any) => {
  //         console.error(err);
  //         this.snackBarService.error('Failed to upload image');
  //       },
  //     });
  // }

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

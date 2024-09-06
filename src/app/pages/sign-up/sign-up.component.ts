import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountriesService } from '../../services/countries.service';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { PageNumberComponent } from './page-number/page-number.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    AngularMaterialModule,
    FileUploadComponent,
    ReactiveFormsModule,
    PageNumberComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  @ViewChild('pageMenu') pageMenu!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;

  _snackBar = inject(MatSnackBar);

  signupHeading: string = 'Register Individual Account';
  signupSubHeading: string =
    'For the purpose of industry regulation, your details are required.';

  currentPage: number = 0;
  pageCount: number = 4;

  passed: number = 0;
  active: number = 1;

  countries: any[] = [];

  passwordVisible: boolean = false;

  isLoading: boolean = false;
  preloader: boolean = false;
  isDocPreload: boolean = true;

  constructor(
    private countryService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.preloader = true;
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.preloader = false;
      },
      error: (error) => {
        console.log(error);
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: {
            message: error.error.message,
            color: 'danger',
          },
          duration: 5000,
        });
      },
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    if (this.passwordInput.nativeElement.type == 'text') {
      this.passwordInput.nativeElement.type = 'password';
      this.confirmPasswordInput.nativeElement.type = 'password';
    } else {
      this.passwordInput.nativeElement.type = 'text';
      this.confirmPasswordInput.nativeElement.type = 'text';
    }
  }

  goToNextPage(...controls: string[]) {
    let isValid = true;

    controls.forEach((control) => {
      const formControl = this.signupForm.get(control);
      if (formControl) {
        formControl.markAsTouched();

        if (control === 'password_confirmation') {
          if (
            this.passwordInput.nativeElement.value !=
            this.confirmPasswordInput.nativeElement.value
          ) {
            isValid = false;
            this._snackBar.openFromComponent(SnackBarComponent, {
              duration: 5 * 1000,
              data: {
                message: 'Password do not match. Please confirm password!',
                color: 'danger',
              },
            });
          } else if (this.passwordInput.nativeElement.value.length < 8) {
            isValid = false;
            this._snackBar.openFromComponent(SnackBarComponent, {
              duration: 5 * 1000,
              data: {
                message: 'Password must be at least 8 characters',
                color: 'danger',
              },
            });
          }
        }

        if (formControl.invalid) {
          isValid = false;
        }
      }
    });

    if (isValid && this.currentPage < this.pageCount - 1) {
      this.passed++;
      this.active++;
      this.currentPage++;
      this.updatePagePosition();
      this.setHeading();
    } else {
      console.log(
        'One or more fields are invalid. Please correct the errors before proceeding.'
      );
    }
  }

  goToBackPage() {
    if (this.currentPage > 0) {
      this.passed--;
      this.active--;
      this.currentPage--;
      this.updatePagePosition();
      this.setHeading();
    }
  }

  toggleDocUpload() {
    this.isLoading = !this.isLoading;

    setTimeout(() => {
      this.isLoading = !this.isLoading;
      this.isDocPreload = !this.isDocPreload;
      this.setHeading();
    }, 2000);
  }

  private updatePagePosition() {
    this.pageMenu.nativeElement.style.transform = `translateX(-${
      this.currentPage * 100
    }%)`;
  }

  private setHeading() {
    if (this.currentPage === 0 || this.currentPage === 1) {
      this.signupHeading = 'Register Individual Account';
      this.signupSubHeading =
        'For the purpose of industry regulation, your details are required.';
    } else if (this.currentPage === 2) {
      if (this.isDocPreload) {
        this.signupHeading = 'Account Verification';
        this.signupSubHeading = 'Here is what you will have to do.';
      } else {
        this.signupHeading = 'Select the type of document to identify you. ';
        this.signupSubHeading =
          'The identification card you select will be scanned in the next step.  Please make sure it has not expired and is clear and easy to read.';
      }
    }
  }

  signupForm = new FormGroup({
    country: new FormControl([], Validators.required),
    firstname: new FormControl([], Validators.required),
    lastname: new FormControl([], Validators.required),
    gender: new FormControl([], Validators.required),
    dob: new FormControl([], Validators.required),
    email: new FormControl([], [Validators.email, Validators.required]),

    currency: new FormControl([], Validators.required),
    phone: new FormControl([], Validators.required),
    password: new FormControl([], Validators.required),
    password_confirmation: new FormControl(''),
    doc_type: new FormControl([], Validators.required),
    image: new FormControl([], Validators.required),
    video: new FormControl([], Validators.required),
  });

  areControlsValid(...controls: []) {
    console.log(controls);
  }

  submitForm() {
    this.router.navigate(['/verify-email']);
  }
}

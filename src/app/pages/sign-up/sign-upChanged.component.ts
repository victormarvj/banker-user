import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountriesService } from '../../services/countries.service';
import { Router, RouterModule } from '@angular/router';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { PageNumberComponent } from './page-number/page-number.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GoogleTranslateService } from '../../services/google-translate.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    PageNumberComponent,
    AsyncPipe,
    RouterModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  @ViewChild('pageMenu') pageMenu!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;

  signupHeading: string = 'Register Individual Account';
  signupSubHeading: string =
    'For the purpose of industry regulation, your details are required.';

  currentPage: number = 0;
  pageCount: number = 3;

  passed: number = 0;
  active: number = 1;

  countries: any[] = [];
  currencies: any[] = [];
  filteredCountries!: Observable<any[]>;
  filteredCurrencies!: Observable<any[]>;

  passwordVisible: boolean = false;

  isLoading: boolean = false;
  preloader: boolean = false;
  isDocPreload: boolean = true;

  isFormValid = false;

  constructor(
    private countryService: CountriesService,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private router: Router,
    private googleTranslate: GoogleTranslateService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.preloader = true;
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;

        // Extract a list of currencies from the country data
        this.currencies = this.extractCurrencies(data);

        this.preloader = false;

        // Setup the filter logic after countries are loaded
        this.filteredCountries = this.signupForm
          .get('country')!
          .valueChanges.pipe(
            startWith(''),
            map((value: any) => this._filterCountries(value || ''))
          );

        // Setup the filter logic after countries are loaded
        this.filteredCurrencies = this.signupForm
          .get('currency')!
          .valueChanges.pipe(
            startWith(''),
            map((value: any) => this._filterCountriesCurrency(value || ''))
          );
      },
      error: (err) => {
        this.snackBarService.error('failed to load countries');
      },
    });
  }

  private _filterCountries(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter((country) =>
      country.name.common.toLowerCase().includes(filterValue)
    );
  }

  private _filterCountriesCurrency(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.currencies.filter(
      (currency) =>
        currency.name.toLowerCase().includes(filterValue) ||
        currency.symbol.toLowerCase().includes(filterValue)
    );
  }

  private extractCurrencies(countries: any[]): any[] {
    let currenciesArray: any[] = [];
    countries.forEach((country) => {
      if (country.currencies) {
        Object.keys(country.currencies).forEach((currencyKey) => {
          currenciesArray.push({
            name: country.currencies[currencyKey].name,
            symbol: country.currencies[currencyKey].symbol,
            code: currencyKey,
            country: country.name.common,
            flag: country.flags.svg,
          });
        });
      }
    });
    return currenciesArray;
  }

  // Function to get the keys of the currencies object for each country
  getCurrencyKeys(country: any): string[] {
    return Object.keys(country.currencies || {});
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
            this.snackBarService.error(
              'Password do not match. Please confirm password!'
            );
          } else if (this.passwordInput.nativeElement.value.length < 8) {
            isValid = false;
            this.snackBarService.error(
              'Password must be at least 8 characters'
            );
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
    password_confirmation: new FormControl([], Validators.required),
  });

  passwordMatch() {
    if (
      this.passwordInput.nativeElement.value !=
      this.confirmPasswordInput.nativeElement.value
    ) {
      this.isFormValid = false;
      this.snackBarService.error(
        'Password do not match. Please confirm password!'
      );
    } else if (this.passwordInput.nativeElement.value.length < 8) {
      this.isFormValid = false;
      this.snackBarService.error('Password must be at least 8 characters');
    } else {
      this.isFormValid = true;
    }
  }

  submitForm() {
    if (this.signupForm.valid && this.isFormValid) {
      this.isLoading = true;
      const formData = this.signupForm.value;
      this.userService.registerUser(formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.snackBarService.success(res.message);
          this.userService.revokeAuthStorage();
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.snackBarService.error(err.error.error);
        },
      });
    } else {
      this.snackBarService.error('Invalid form inputs');
    }
  }

  @ViewChild('translateParent', { static: true }) translateParent!: ElementRef;
  private translateDivId = 'google_translate_element';

  ngAfterViewInit(): void {
    // Create and insert div
    const div = document.createElement('div');
    div.id = this.translateDivId;
    this.translateParent.nativeElement.appendChild(div);

    this.googleTranslate.loadScript().then(() => {
      this.googleTranslate.createWidget(this.translateDivId);
    });
  }

  ngOnDestroy(): void {
    // Clean up
    const div = document.getElementById(this.translateDivId);
    if (div) {
      div.remove();
    }

    this.googleTranslate.unloadScript();
  }
}

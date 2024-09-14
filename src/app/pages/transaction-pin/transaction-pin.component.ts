import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-transaction-pin',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule],
  templateUrl: './transaction-pin.component.html',
  styleUrl: './transaction-pin.component.scss',
})
export class TransactionPinComponent implements OnInit {
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLButtonElement>;

  transactionPinForm: FormGroup;
  digits: string[] = ['', '', '', ''];

  buttonText: string = 'Create Pin';
  titleText: string = 'Type in the 4 digit code';

  isPin: number = 0; // Tracks if it's the first or second entry
  pin1: string = ''; // First PIN entered by the user
  pin2: string = ''; // Second PIN entered by the user (confirmation)

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {
    // Initialize the form with a single control for the combined PIN code
    this.transactionPinForm = this.fb.group({
      pin: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('^[0-9]{4}$'),
        ],
      ],
    });
  }

  // Move focus to the next input field after entering a digit or handle backspace
  moveToNext(index: number, event: KeyboardEvent | Event) {
    const input = event.target as HTMLInputElement;

    if (event instanceof KeyboardEvent) {
      if (event.key === 'Backspace') {
        // Handle backspace and move focus to the previous input if necessary
        if (input.value === '' && index > 0) {
          this.digits[index - 1] = '';
          setTimeout(() => {
            (
              document.getElementById(`digit${index - 1}`) as HTMLInputElement
            )?.focus();
          }, 0);
        } else {
          this.digits[index] = '';
        }
      } else if (/^[0-9]$/.test(input.value)) {
        // When a valid number is entered, store the digit
        this.digits[index] = input.value;
        // Move focus to the next input regardless of the current input value length
        if (index < this.digits.length - 1) {
          setTimeout(() => {
            (
              document.getElementById(`digit${index + 1}`) as HTMLInputElement
            )?.focus();
          }, 0);
        }
      }
    } else if (event instanceof InputEvent) {
      // Handle input event for non-keyboard events (e.g., clicking with a mouse)
      if (/^[0-9]$/.test(input.value)) {
        this.digits[index] = input.value;
        if (index < this.digits.length - 1) {
          setTimeout(() => {
            (
              document.getElementById(`digit${index + 1}`) as HTMLInputElement
            )?.focus();
          }, 0);
        }
      }
    }

    this.updateTransactionPin();
  }

  // Update the combined verification code in the form control
  updateTransactionPin() {
    const code = this.digits.join('');
    this.transactionPinForm.patchValue({ pin: code });

    if (this.isPin === 0) {
      // First PIN entry (creation)
      this.buttonText = 'Create Pin';
      this.titleText = 'Type in the 4 digit code';
      this.pin1 = this.transactionPinForm.get('pin')?.value;

      if (this.pin1.length === 4) {
        this.isPin = 1; // Switch to confirmation mode
        this.transactionPinForm.reset(); // Reset form for confirmation

        // Reset the digits and refocus on the first input for confirmation
        setTimeout(() => {
          this.digits = ['', '', '', ''];
          (document.getElementById('digit0') as HTMLInputElement)?.focus();
          this.updateTransactionPin(); // Update form control with empty PIN
        }, 0);
      }
    } else {
      // Second PIN entry (confirmation)
      this.buttonText = 'Confirm Pin';
      this.titleText = 'Please confirm your PIN';
      this.pin2 = this.transactionPinForm.get('pin')?.value;

      if (this.pin2.length === 4) {
        if (this.pin1 !== this.pin2) {
          // PINs don't match, reset and start over
          this.snackBarService.error('PINs do not match. Please try again.');
          this.transactionPinForm.reset();
          this.pin1 = '';
          this.pin2 = '';
          this.isPin = 0; // Go back to creation mode
          this.buttonText = 'Create Pin';
          this.titleText = 'Type in the 4 digit code';
          setTimeout(() => {
            (document.getElementById('digit0') as HTMLInputElement)?.focus();
            this.digits = ['', '', '', '']; // Reset input fields
          }, 0);
        } else {
          // PINs match, enable form submission
          this.submitBtn.nativeElement.type = 'submit';
        }
      }
    }
  }

  // Form submission
  onSubmit() {
    if (this.transactionPinForm.valid) {
      // Handle successful form submission

      const formData = this.transactionPinForm.value;
      this.isLoading = true;
      this.userService.setTransactionPin(formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.snackBarService.success(res.message);

          this.userService.updateUserSignal(res.user);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          this.snackBarService.error(err.error.error);
        },
      });
    } else {
      console.log('Invalid form');
    }
  }

  userData: any;

  ngOnInit(): void {
    this.userData = this.userService.getAuthenticatedUserStorage;
  }

  logOut() {
    this.userService.logOut().subscribe((res) => {
      this.snackBarService.success(res.message);
    });
    this.userService.revokeAuthStorage();
  }
}

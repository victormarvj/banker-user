import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../services/snack-bar.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-email-pin',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule],
  templateUrl: './email-pin.component.html',
  styleUrl: './email-pin.component.scss',
})
export class EmailPinComponent implements OnDestroy {
  verificationForm: FormGroup;
  digits: string[] = ['', '', '', '', '', ''];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBarService: SnackBarService,
    private userService: UserService
  ) {
    this.verificationForm = this.fb.group({
      email_pin: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]{6}$'),
        ],
      ],
    });
  }

  moveToNext(index: number, event: KeyboardEvent | Event) {
    const input = event.target as HTMLInputElement;

    if (event instanceof KeyboardEvent) {
      if (event.key === 'Backspace') {
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
        this.digits[index] = input.value;
        if (index < this.digits.length - 1) {
          setTimeout(() => {
            (
              document.getElementById(`digit${index + 1}`) as HTMLInputElement
            )?.focus();
          }, 0);
        }
      }
    } else if (event instanceof InputEvent) {
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

    this.updateVerificationCode();
  }

  updateVerificationCode() {
    const code = this.digits.join('');
    this.verificationForm.patchValue({ email_pin: code });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      // const code = this.verificationForm.get('verificationCode')?.value;

      const formData = this.verificationForm.value;

      this.isLoading = true;
      this.userService.verifyEmail(formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.snackBarService.success(res.message);

          this.userService.updateUserSignal(res.user);

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.snackBarService.error(err.error.error);
          this.isLoading = false;
        },
      });
    } else {
      console.log('Invalid code');
    }
  }

  canResend: boolean = true;
  counter: number = 30;
  interval: any;

  isLoading = false;

  setCanResend() {
    this.canResend = false;
    this.counter = 30;

    this.interval = setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      }

      if (this.counter === 0) {
        clearInterval(this.interval);
        this.canResend = true;
        console.log('Timer completed, you can resend now.');
      }
    }, 1000);
  }

  resendVerificationEmail() {
    this.isLoading = true;
    this.userService.resendVerificationEmail().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBarService.success(
          'Verification email sent. Please check your mail.'
        );
        this.setCanResend();
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.canResend = true;
      },
    });
  }

  logOut() {
    this.userService.logOut().subscribe((res) => {
      this.snackBarService.success(res.message);
    });
    this.userService.revokeAuthStorage();
  }

  ngOnDestroy(): void {
    // Stop the resend timer if the component is destroyed
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

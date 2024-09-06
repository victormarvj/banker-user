import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-pin',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule],
  templateUrl: './email-pin.component.html',
  styleUrl: './email-pin.component.scss',
})
export class EmailPinComponent {
  verificationForm: FormGroup;
  digits: string[] = ['', '', '', '', '', ''];

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form with a single control for the combined code
    this.verificationForm = this.fb.group({
      verificationCode: [
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

  // Move focus to the next input field after entering a digit or handle backspace
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

  // Update the combined verification code in the form control
  updateVerificationCode() {
    const code = this.digits.join('');
    this.verificationForm.patchValue({ verificationCode: code });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      const code = this.verificationForm.get('verificationCode')?.value;

      this.router.navigate(['/dashboard']);
    } else {
      console.log('Invalid code');
    }
  }
}

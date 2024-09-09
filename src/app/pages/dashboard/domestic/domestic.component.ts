import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from 'express';

@Component({
  selector: 'app-domestic',
  standalone: true,
  imports: [
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './domestic.component.html',
  styleUrl: './domestic.component.scss',
})
export class DomesticComponent {
  transferForm: FormGroup;
  isLoading: boolean = false;
  pin: string = '';

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      account_number: ['', Validators.required],
      account_name: ['', Validators.required],
      bank_name: ['', Validators.required],
      amount: ['', Validators.required],
      description: [''],
      pin: [''],
      digits: this.fb.array(this.createDigitsArray()),
    });
  }

  get digitsArray() {
    return this.transferForm.get('digits') as FormArray;
  }

  // Helper to create initial digit form controls
  private createDigitsArray(): FormControl[] {
    return ['', '', '', ''].map(() => this.fb.control(''));
  }

  moveToNext(index: number, event: KeyboardEvent | Event) {
    const input = event.target as HTMLInputElement;
    const digitsArray = this.digitsArray;

    if (event instanceof KeyboardEvent) {
      if (event.key === 'Backspace') {
        if (input.value === '' && index > 0) {
          digitsArray.at(index - 1).setValue('');
          setTimeout(() => {
            (
              document.getElementById(`digit${index - 1}`) as HTMLInputElement
            )?.focus();
          }, 0);
        } else {
          digitsArray.at(index).setValue('');
        }
      } else if (/^[0-9]$/.test(input.value)) {
        digitsArray.at(index).setValue(input.value);
        if (index < digitsArray.length - 1) {
          setTimeout(() => {
            (
              document.getElementById(`digit${index + 1}`) as HTMLInputElement
            )?.focus();
          }, 0);
        }
      }
    } else if (event instanceof InputEvent) {
      if (/^[0-9]$/.test(input.value)) {
        digitsArray.at(index).setValue(input.value);
        if (index < digitsArray.length - 1) {
          setTimeout(() => {
            (
              document.getElementById(`digit${index + 1}`) as HTMLInputElement
            )?.focus();
          }, 0);
        }
      }
    }

    this.updatePinCode();
  }

  // Update the combined verification code in the form control
  updatePinCode() {
    const code = this.digitsArray.value.join('');
    this.transferForm.patchValue({ pin: code });
    this.pin = this.transferForm.get('pin')?.value;
  }

  enterPin() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Fixed the setTimeout instead of setInterval
  }

  onSubmit() {
    console.log('Form submitted', this.transferForm.value);
  }
}

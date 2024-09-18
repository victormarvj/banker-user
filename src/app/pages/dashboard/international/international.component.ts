import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { TransferService } from '../../../services/transfer.service';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-international',
  standalone: true,
  imports: [
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './international.component.html',
  styleUrl: './international.component.scss',
})
export class InternationalComponent {
  @ViewChild('openModal') open!: ElementRef;
  @ViewChild('closeModal') close!: ElementRef;

  transferForm: FormGroup;
  isLoading: boolean = false;

  pinCount = 4;
  pin: string = '';
  otp: string = '';

  userData: any;

  banks: any;
  filteredBanks!: Observable<any[]>;
  swiftCode: string = 'jsjdfl';

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserDetails().subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res.user);
        this.userService.updateUserSignal(res.user);
        this.userData = this.userService.getAuthenticatedUserStorage;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });

    this.getBanks();
  }

  getBanks() {
    this.isLoading = true;
    this.transferService.getBanks().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.banks = res.banks;

        // Listen to form control value changes
        this.filteredBanks = this.transferForm
          .get('bank_name')!
          .valueChanges.pipe(
            startWith(''),
            map((value: any) => {
              return typeof value === 'string'
                ? this._filterBanks(value)
                : this.banks;
            })
          );
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error.error);
      },
    });
  }

  // Filter banks by name
  private _filterBanks(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.banks.filter((bank: any) =>
      bank.bank_name.toLowerCase().includes(filterValue)
    );
  }

  // Display function to show the name in the input field after selection
  displayFn(bank: any): string {
    return bank && bank.bank_name ? bank.bank_name : '';
  }

  setSwiftCode($event: any) {
    const swift_code = $event.option.value.swift_code;
    this.transferForm.get('swift_code')?.patchValue(swift_code);
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private transferService: TransferService
  ) {
    this.transferForm = this.fb.group({
      account_number: ['', Validators.required],
      account_name: ['', Validators.required],
      bank_name: ['', Validators.required],
      swift_code: ['', Validators.required],
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

  setOTPValue(event: any) {
    this.otp = event.target.value; // Correct way to access the input value
    console.log(this.otp); // Logs the entered OTP value
  }

  checkPin() {
    if (this.transferForm.valid) {
      this.pinCount--;
      if (this.pin != this.userData.pin) {
        this.snackBarService.error(
          'Incorrect pin. ' + this.pinCount + ' Tries remaining'
        );

        this.digitsArray.at(0).setValue('');
        this.digitsArray.at(1).setValue('');
        this.digitsArray.at(2).setValue('');
        this.digitsArray.at(3).setValue('');
        this.pin = '';

        if (this.pinCount === 0) {
          this.transferForm.reset();
        }
      } else {
        this.isLoading = true;
        this.transferService.getOTP().subscribe({
          next: (res) => {
            this.isLoading = false;
            this.userService.updateUserSignal(res.user);
            this.userData = this.userService.getAuthenticatedUserStorage;

            this.open.nativeElement.click();
          },
          error: (err) => {
            this.close.nativeElement.click();
            this.isLoading = false;
            console.log(err);
            this.snackBarService.error(err.error.error);
            this.transferForm.reset();
          },
        });
      }
    } else {
      console.log('Form is not valiid');
      this.snackBarService.error('Invalid Form');
    }
  }

  onSubmit() {
    if (this.transferForm.valid) {
      if (this.otp != this.userData.otp) {
        this.otp = '';
        this.snackBarService.error('Invalid OTP Code. Try Again');
      } else {
        const selectedBankId = this.transferForm.get('bank_name')!.value.id;

        this.transferForm.patchValue({
          bank_name: selectedBankId,
        });

        const formData = this.transferForm.value;
        console.log(formData);
      }
    } else {
      console.log('Invalid form');
    }
  }
}

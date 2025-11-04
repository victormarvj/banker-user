import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { Router, RouterModule } from '@angular/router';
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
import { AsyncPipe, JsonPipe } from '@angular/common';

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
export class InternationalComponent implements OnInit {
  @ViewChild('openModal') open!: ElementRef;
  @ViewChild('closeModal') close!: ElementRef;
  @ViewChild('otpBtn') otpBtn!: ElementRef;

  transferForm: FormGroup;
  isLoading: boolean = false;

  pinCount = 4;
  otpCount = 4;
  pin: string = '';
  otp: string = '';

  isSubmitBtn: boolean = false;

  userData: any;

  banks: any;
  filteredBanks!: Observable<any[]>;
  swiftCode: string = 'jsjdfl';

  ngOnInit(): void {
    this.isLoading = true;
    this.getUserDetails();
    this.checkTempTransfer();

    this.getBanks();
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.userService.updateUserSignal(res.user);
        this.userData = this.userService.getAuthenticatedUserStorage;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }

  checkTempTransfer() {
    this.transferService.checkTempTransfer().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res) {
          this.router.navigate(['/dashboard/incomplete-transaction']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
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
    private transferService: TransferService,
    private router: Router
  ) {
    this.transferForm = this.fb.group({
      account_number: ['', Validators.required],
      account_name: ['', Validators.required],
      bank_name: ['', Validators.required],
      swift_code: ['', Validators.required],
      amount: ['', Validators.required],
      routing_number: ['', Validators.required],
      account_type: ['', Validators.required],
      save_beneficiary: false,
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
  }

  checkOtp() {
    // Ensure the form is valid before proceeding
    if (this.transferForm.valid) {
      this.otpCount--; // Decrement the OTP count

      // Check if the entered OTP is correct
      if (this.otp != this.userData?.otp) {
        this.otp = '';

        // Display an error message with remaining tries
        this.snackBarService.error(
          `Incorrect OTP. ${this.otpCount} tries remaining`
        );

        // If no tries are remaining, reset the form and reload the page
        if (this.otpCount === 0) {
          this.transferForm.reset(); // Reset the form

          // Reset the OTP button to initial state
          this.otpBtn.nativeElement.innerHTML = 'Confirm OTP';
          this.otpBtn.nativeElement.type = 'button'; // Ensure button is not submit

          // Optionally show a message before reload
          this.snackBarService.error('No OTP attempts remaining. Reloading...');

          // Reload the page after a brief delay (optional)
          setTimeout(() => {
            location.reload(); // Force the page to reload
          }, 2000); // Delay the reload to show the message (optional)
        }
      } else {
        // If OTP is correct, change the button to confirm the transaction
        this.otpBtn.nativeElement.innerHTML = 'Continue Transaction';
        // this.otpBtn.nativeElement.type = 'submit'; // Set button to submit

        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.close.nativeElement.click();
          this.isSubmitBtn = true;
          this.snackBarService.success(
            'OTP Verified! Proceeding to transaction.'
          );
        }, 1000);

        // Optionally disable the button to prevent further OTP entry
        // this.otpBtn.nativeElement.disabled = true;
      }
    } else {
      console.log('Form is not valid');
      this.snackBarService.error('Invalid Form');
    }
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

          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } else {
        this.isLoading = true;
        this.transferService.getOTP().subscribe({
          next: (res) => {
            this.isLoading = false;
            this.userService.updateUserSignal(res.user);
            this.userData = this.userService.getAuthenticatedUserStorage;

            this.open.nativeElement.click();

            this.digitsArray.at(0).setValue('');
            this.digitsArray.at(1).setValue('');
            this.digitsArray.at(2).setValue('');
            this.digitsArray.at(3).setValue('');
            this.pin = '';
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

  checkBalance(event: any) {
    const inputAmount = event.target.value;
    const balance = this.userData?.account_balance;
    const transfer_limit = this.userData?.transfer_limit;
    const account_minimum = this.userData?.account_minimum;

    const amountControl = this.transferForm.get('amount');

    if (balance === 0 || inputAmount > balance) {
      amountControl?.markAllAsTouched();
      amountControl?.setErrors({ insufficientBalance: true });
    } else if (inputAmount > transfer_limit) {
      amountControl?.markAllAsTouched();
      amountControl?.setErrors({ transferLimit: true });
    } else if (inputAmount < account_minimum) {
      amountControl?.markAllAsTouched();
      amountControl?.setErrors({ accountMinimum: true });
    } else {
      amountControl?.setErrors(null);
    }
  }

  checkAccountNumberInternational(event: any) {
    const account_number = event.target.value;
    if (account_number.length === 10) {
      let formData = {
        account_no: account_number,
      };
      // console.log(formData);
      this.isLoading = true;
      this.transferService.checkAccountNumberInternational(formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          // console.log(res);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          const accountNumberControl = this.transferForm.get('account_number');
          accountNumberControl?.markAllAsTouched();
          accountNumberControl?.setErrors({ notDomestic: true });
          this.snackBarService.error(err.error.error);
        },
      });
    }
  }

  onSubmit() {
    if (this.transferForm.valid) {
      const bankName = this.transferForm.get('bank_name')!.value.bank_name;

      this.transferForm.patchValue({
        bank_name: bankName,
      });

      const formData = this.transferForm.value;
      this.isLoading = true;

      if (this.userData.no_of_codes == 0) {
        this.transferInternational(formData);
      } else {
        this.tempTransferInternational(formData);
      }
    } else {
      console.log('Invalid form');
    }
  }

  transferInternational(formData: any) {
    this.transferService.transferInternational(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.userService.updateUserSignal(res.user);
        this.userData = this.userService.getAuthenticatedUserStorage;

        this.router.navigate([`/dashboard/success/${res.transactionId}`]);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error.error);
        this.transferForm.reset();
        this.transferForm.patchValue({
          save_beneficiary: false,
        });
        this.isSubmitBtn = false;
      },
    });
  }

  tempTransferInternational(formData: FormData) {
    this.transferService.tempTransferInternational(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.userService.updateUserSignal(res.user);
        this.userData = this.userService.getAuthenticatedUserStorage;

        this.router.navigate([`/dashboard/incomplete-transaction`]);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error.error);
        this.transferForm.reset();
        this.transferForm.patchValue({
          save_beneficiary: false,
        });
        this.isSubmitBtn = false;
      },
    });
  }
}

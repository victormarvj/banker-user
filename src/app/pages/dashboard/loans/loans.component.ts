import {
  Component,
  ElementRef,
  Inject,
  inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { LoanService } from '../../../services/loan.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Config } from 'datatables.net';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DatePipe,
  ],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss',
})
export class LoansComponent implements OnDestroy {
  @ViewChild('openModal') open!: ElementRef;
  @ViewChild('closeModal') close!: ElementRef;
  @ViewChild('otpBtn') otpBtn!: ElementRef;

  isLoading: boolean = false;
  userData: any;
  pinCount = 4;
  pin: string = '';
  isSubmitBtn: boolean = false;
  payBackAmount: number = 0;

  private $destroy = new Subject<void>();

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private snackBarService = inject(SnackBarService);
  private loanService = inject(LoanService);

  dtOptions: Config = {};
  isBrowser: boolean = false;

  loans!: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getUserDetails();

    if (this.isBrowser) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        searching: true,
      };
    }

    this.getLoans();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  loanForm = this.fb.group({
    loan_amount: ['', Validators.required],
    payback_amount: ['', Validators.required],
    employment_status: ['', Validators.required],
    income: ['', Validators.required],
    expense: ['', Validators.required],
    duration: ['', Validators.required],
    description: [''],
    pin: [''],
    digits: this.fb.array(this.createDigitsArray()),
    isValidAmount: ['', Validators.required],
  });

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

  get digitsArray() {
    return this.loanForm.get('digits') as FormArray;
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
    this.loanForm.patchValue({ pin: code });
    this.pin = this.loanForm.get('pin')?.value as string;
  }

  enterPin() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Fixed the setTimeout instead of setInterval
  }

  checkPin() {
    if (this.loanForm.valid) {
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
          this.loanForm.reset();

          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } else {
        this.isLoading = true;
        this.userData = this.userService.getAuthenticatedUserStorage;

        setTimeout(() => {
          this.open.nativeElement.click();

          this.digitsArray.at(0).setValue('');
          this.digitsArray.at(1).setValue('');
          this.digitsArray.at(2).setValue('');
          this.digitsArray.at(3).setValue('');
          this.pin = '';
          this.isLoading = false;

          this.isSubmitBtn = true;
        }, 2000);
      }
    } else {
      console.log('Form is not valiid');
      this.snackBarService.error('Invalid Form');
    }
  }

  checkLoanAmount($event: Event) {
    const input = $event.target as HTMLInputElement;
    let loanAmount = Number(input.value);
    if (loanAmount > this.userData?.max_loan_amount || loanAmount <= 0) {
      this.loanForm.get('isValidAmount')?.setValue('');
      this.loanForm.get('loan_amount')?.setErrors({ invalidAmount: true });
    } else {
      this.loanForm.get('isValidAmount')?.setValue('true');
    }
  }

  calcPaybackAmount($event: any) {
    const input = $event.target as HTMLInputElement;
    let loanAmount = Number(input.value);
    if (loanAmount > 0) {
      this.payBackAmount =
        (this.userData?.loan_percent / 100) * loanAmount + loanAmount;
      this.loanForm.patchValue({
        payback_amount: String(this.payBackAmount),
      });
    }
  }

  onSubmit() {
    if (this.loanForm.valid) {
      this.isLoading = true;

      this.loanService
        .requestCarLoan(this.loanForm.value)
        .pipe(takeUntil(this.$destroy))
        .subscribe({
          next: (res: any) => {
            this.isLoading = false;
            this.snackBarService.success('Loan request sent successfully!!!');
            this.loanForm.reset();
            this.isSubmitBtn = false;
            this.payBackAmount = 0;
            this.getLoans();
          },
          error: (err: any) => {
            this.isLoading = false;
            console.log(err);
            this.snackBarService.error(err.error.error);
            this.loanForm.reset();
            this.isSubmitBtn = false;
            this.payBackAmount = 0;
          },
        });
    }
  }

  getLoans() {
    this.isLoading = true;
    this.loanService
      .getLoans()
      .pipe(takeUntil(this.$destroy))
      .subscribe((loans) => {
        this.isLoading = false;
        this.loans = loans;
      });
  }
}

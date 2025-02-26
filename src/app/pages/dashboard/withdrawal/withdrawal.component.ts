import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { MethodService } from '../../../services/method.service';
import { WithdrawalService } from '../../../services/withdrawal.service';

@Component({
  selector: 'app-withdrawal',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './withdrawal.component.html',
  styleUrl: './withdrawal.component.scss',
})
export class WithdrawalComponent implements OnInit {
  @ViewChild('closeModal') close!: ElementRef;
  @ViewChild('submitBtn') btn!: ElementRef;

  isLoading: boolean = false;

  withdrawalForm: FormGroup;

  userData!: any;

  isSubmitBtn: boolean = false;

  methods!: any;

  rate: number = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private methodService: MethodService,
    private withdrawalService: WithdrawalService
  ) {
    this.withdrawalForm = this.fb.group({
      method_id: ['', Validators.required],
      network: ['', Validators.required],
      address: ['', Validators.required],
      amount: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.retrieveCryptoMethods();
  }

  confirmModal() {
    this.isSubmitBtn = true;
    this.close.nativeElement.click();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.btn.nativeElement.focus();
    }, 2000);
  }

  getUserDetails() {
    this.isLoading = true;
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

  retrieveCryptoMethods() {
    this.isLoading = true;
    this.methodService.retrieveCryptoMethods().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.methods = res;
        // console.log(this.methods);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }

  getNetwork(event: any) {
    const methodId = event.value;
    this.methods.find((method: any) => {
      if (method.id === methodId) {
        this.withdrawalForm.patchValue({
          network: method.network,
        });
        this.rate = +method.rate;

        this.withdrawalForm.patchValue({
          amount: '',
          value: '',
        });
      }
    });
  }

  checkBalance(event: any) {
    const inputAmount = event.target.value;
    const balance = this.userData?.account_balance;
    const transfer_limit = this.userData?.transfer_limit;
    const account_minimum = this.userData?.account_minimum;

    const amountControl = this.withdrawalForm.get('amount');

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

    this.calcValue();
  }

  calcValue() {
    const inputAmount = this.withdrawalForm.get('amount')?.value;
    this.withdrawalForm.patchValue({
      value: (inputAmount / this.rate).toFixed(5),
    });
  }

  onSubmit() {
    this.isLoading = true;
    const formData = this.withdrawalForm.value;

    this.withdrawalService.newWithdrawal(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBarService.success(
          'Withdrawal placed successfully. Please wait for the transaction block chain to be comfirmed!'
        );
        this.withdrawalForm.reset();
        this.getUserDetails();
        this.isSubmitBtn = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }
}

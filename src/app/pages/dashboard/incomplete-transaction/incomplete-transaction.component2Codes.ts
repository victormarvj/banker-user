import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { TransferService } from '../../../services/transfer.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incomplete-transaction',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule],
  templateUrl: './incomplete-transaction.component.html',
  styleUrl: './incomplete-transaction.component.scss',
})
export class IncompleteTransactionComponent implements OnInit {
  isLoading: boolean = false;
  codeLabel: string = '';
  userData: any;

  triesLeft: number = 0;

  code: any;

  type: any;

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService,
    private transferService: TransferService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.init();
    this.getUserDetails();
  }

  init() {
    this.triesLeft = Math.floor(Math.random() * 2 + 1);
    this.code = '';
  }

  getUserDetails() {
    this.isLoading = true;
    this.userService.getUserDetails().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.userService.updateUserSignal(res.user);
        this.userData = this.userService.getAuthenticatedUserStorage;
        this.checkTempTransfer();
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }

  checkTempTransfer() {
    this.isLoading = true;
    this.transferService.checkTempTransfer().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res) {
          switch (res.transaction.code_level) {
            case 1:
              this.type = this.userData.tax_code;
              this.codeLabel = 'VAT (Value Added Tax) Code';
              return;
            default:
              this.type = this.userData.transfer_code;
              this.codeLabel = 'Account Activation Code';
              return;
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }

  cancelTransaction() {
    this.transferService.cancelTempTransfer().subscribe({
      next: (res) => {
        if (res) {
          this.snackBarService.success(
            'Transfer transaction canceled successfully'
          );
          this.location.back();
        } else {
          this.snackBarService.error('Unable to complete request!');
        }
      },
    });
  }

  checkCode() {
    if (this.code !== this.type) {
      this.triesLeft--;

      if (this.triesLeft <= 0) {
        this.cancelTransaction();
        return; // Stop execution after canceling
      }

      this.snackBarService.error('Invalid code provided. Try again!');
      return; // Stop execution if the code is invalid
    }

    this.isLoading = true; // Start loading before request

    const formData = new FormData();
    formData.append('code', this.code);

    this.transferService.validateTempTransfer(formData).subscribe({
      next: (res) => {
        this.isLoading = false; // Stop loading after success

        if (res.status == 0) {
          this.init();
          this.getUserDetails();
          return;
        } else {
          this.userService.updateUserSignal(res.user);
          this.userData = this.userService.getAuthenticatedUserStorage;

          this.router.navigate([`/dashboard/success/${res.transactionId}`]);
        }
      },
      error: (err) => {
        this.isLoading = false; // Stop loading after error
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }
}

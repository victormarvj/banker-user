import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { Config } from 'datatables.net';
import { WithdrawalService } from '../../../services/withdrawal.service';
import { UserService } from '../../../services/user.service';
import { SnackBarService } from '../../../services/snack-bar.service';

@Component({
  selector: 'app-withdrawal-history',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './withdrawal-history.component.html',
  styleUrl: './withdrawal-history.component.scss',
})
export class WithdrawalHistoryComponent implements OnInit {
  dtOptions: Config = {};
  isBrowser: boolean = false;
  isLoading: boolean = false;

  withdrawals!: any;
  userData!: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private withdrawalService: WithdrawalService,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        searching: true,
      };
    }
    this.getUserDetails();
    this.getWithdrawals();
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

  getWithdrawals() {
    this.isLoading = true;
    this.withdrawalService.getWithdrawals().subscribe((withdrawals) => {
      this.isLoading = false;
      this.withdrawals = withdrawals;
    });
  }
}

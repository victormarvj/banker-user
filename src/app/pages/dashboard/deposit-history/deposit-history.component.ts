import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { Config } from 'datatables.net';
import { DepositService } from '../../../services/deposit.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-deposit-history',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './deposit-history.component.html',
  styleUrl: './deposit-history.component.scss',
})
export class DepositHistoryComponent implements OnInit {
  dtOptions: Config = {};
  isBrowser: boolean = false;

  isLoading: boolean = false;

  deposits!: any;
  userData!: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private depositService: DepositService,
    private snackBarService: SnackBarService,
    private userService: UserService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.dtOptions = {
        pagingType: 'full_numbers',
      };
    }

    this.getUserDetails();
    this.getDeposits();
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

  getDeposits() {
    this.isLoading = true;
    this.depositService.allDeposits().subscribe((deposit) => {
      this.isLoading = false;
      this.deposits = deposit;
    });
  }
}

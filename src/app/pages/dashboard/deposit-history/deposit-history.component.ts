import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { Config } from 'datatables.net';
import { DepositService } from '../../../services/deposit.service';
import { SnackBarService } from '../../../services/snack-bar.service';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private depositService: DepositService,
    private snackBarService: SnackBarService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.dtOptions = {
        pagingType: 'full_numbers',
      };
    }

    this.getDeposits();
  }

  getDeposits() {
    this.isLoading = true;
    this.depositService.allDeposits().subscribe((deposit) => {
      this.isLoading = false;
      this.deposits = deposit;
    });
  }
}

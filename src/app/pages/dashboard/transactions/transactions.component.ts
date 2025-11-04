import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { Config } from 'datatables.net';
import { AngularDatatablesModule } from '../../../shared/angular-datatables/angular-datatables.module';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  isPlatformBrowser,
} from '@angular/common';
import { TransferService } from '../../../services/transfer.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionDetailsModalComponent } from '../../../layouts/transaction-details-modal/transaction-details-modal.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    AngularDatatablesModule,
    DatePipe,
    TransactionDetailsModalComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  dtOptions: Config = {};
  isBrowser: boolean = false;
  transactions$: Observable<any[]> = of([]);
  isLoading: boolean = false;

  userData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private transferService: TransferService,
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

    this.getAllTransactions();
  }

  getAllTransactions() {
    this.isLoading = true;
    this.transferService
      .getAllTransactions()
      .pipe(
        map((res) => {
          this.isLoading = false;
          return res;
        })
      )
      .subscribe({
        next: (transactions) => {
          this.transactions$ = of(transactions);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          this.snackBarService.error('Error getting transactions');
        },
      });
  }

  getCreditTransactionType(type: number): Observable<any[]> {
    return this.transactions$.pipe(
      map((transactions) => {
        if (!this.userData) return [];
        return transactions.filter(
          (transaction) =>
            // transaction.transaction_type === type &&
            transaction.receiver_id == this.userData.id
        );
      })
    );
  }

  getDebitTransactionType(type: number): Observable<any[]> {
    return this.transactions$.pipe(
      map((transactions) => {
        if (!this.userData) return [];
        return transactions.filter(
          (transaction) =>
            // transaction.transaction_type === type &&
            transaction.sender_id == this.userData.id
        );
      })
    );
  }

  showModal = false;
  transactionId!: number;

  viewDetails(id: number) {
    this.transactionId = id; // Pass the correct transaction ID
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  downloadReceipt(id: any) {
    this.isLoading = true;
    this.transactionId = id; // Use the correct transaction ID
    this.transferService.downloadReceipt(this.transactionId).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const a = document.createElement('a');
        a.href = url;
        a.download = `transaction_receipt_${this.transactionId}.pdf`; // Add dynamic filename
        document.body.appendChild(a);

        // Trigger the download
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Free up memory
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error downloading receipt', error);
      }
    );
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransferService } from '../../services/transfer.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-details-modal',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './transaction-details-modal.component.html',
  styleUrl: './transaction-details-modal.component.scss',
})
export class TransactionDetailsModalComponent implements OnInit {
  @Input() transactionId!: number; // Pass transaction ID from parent
  @Output() modalClosed = new EventEmitter<boolean>(); // Pass transaction ID from parent
  transaction: any;
  isLoading = true;

  statusColor: string = '';

  constructor(
    private transferService: TransferService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.fetchTransactionDetails();
  }

  fetchTransactionDetails() {
    this.transferService.getTransactionDetails(this.transactionId).subscribe({
      next: (res: any) => {
        this.transaction = res;
        this.isLoading = false;

        this.statusColor =
          this.transaction.status === 1
            ? '#28a745'
            : this.transaction.status === 0
            ? '#ffc107'
            : '#dc3545';
      },
      error: (err) => {
        console.error('Error fetching transaction details', err);
        this.isLoading = false;
        this.snackBarService.error('Error fetching transaction details');
      },
    });
  }

  closeModal() {
    this.modalClosed.emit(true);
  }
}

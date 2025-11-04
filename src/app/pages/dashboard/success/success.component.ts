import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransactionDetailsModalComponent } from '../../../layouts/transaction-details-modal/transaction-details-modal.component';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    AngularMaterialModule,
    RouterModule,
    TransactionDetailsModalComponent,
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  isLoading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.route.paramMap.subscribe((params) => {
      this.transactionId = +params.get('transactionId')!; // Get transaction ID from route
    });
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
}

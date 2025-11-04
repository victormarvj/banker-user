import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { environment } from '../../../environment';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { FrontImageUploadComponent } from '../../components/front-image-upload/front-image-upload.component';
import { FormsModule } from '@angular/forms';
import { DepositService } from '../../services/deposit.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit-modal',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    FrontImageUploadComponent,
    FormsModule,
  ],
  templateUrl: './deposit-modal.component.html',
  styleUrl: './deposit-modal.component.scss',
})
export class DepositModalComponent implements OnInit {
  @Input() method_id!: number;
  @Output() modalClosed = new EventEmitter<boolean>();

  isLoading: boolean = false;

  address!: any;

  apiRootUrl: string = environment.apiRootUrl;

  receipt: string = '';

  amount: number = 0;
  value!: number;
  rate!: number;

  constructor(
    private addressService: AddressService,
    private depositService: DepositService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAddress(this.method_id);
  }

  findAddress(id: number) {
    this.isLoading = true;
    this.addressService.findAddress(id).subscribe((add) => {
      this.isLoading = false;
      this.address = add;
      this.rate = add.rate;

      this.value = this.amount / this.rate;
    });
  }

  setValue() {
    this.value = this.amount / this.rate;
  }

  closeModal() {
    this.modalClosed.emit(true);
  }

  onImageUpload(url: any) {
    this.receipt = url;
  }

  uploadReceipt(addressId: number) {
    this.isLoading = true;

    const formData = {
      address_id: addressId,
      receipt: this.receipt,
      amount: this.amount,
      value: this.value,
    };

    this.depositService.makeDeposit(formData).subscribe({
      next: (res) => {
        this.reset();
        this.isLoading = false;
        this.snackBarService.success(
          'Deposit received and its been processed. This might take some time'
        );

        this.router.navigate(['/dashboard/deposit-history']);
      },
      error: (err) => {
        this.isLoading = false;
        this.reset();
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });
  }

  reset() {
    this.receipt = '';
    this.amount = 0;
    this.rate = this.address.rate;
    this.value = this.amount / this.rate;
  }
}

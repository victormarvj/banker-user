import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environment';
import { AddressService } from '../../services/address.service';
import { CreditCardService } from '../../services/credit-card.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';
import { FrontImageUploadComponent } from '../../components/front-image-upload/front-image-upload.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credit-card-modal',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    FrontImageUploadComponent,
    FormsModule,
  ],
  templateUrl: './credit-card-modal.component.html',
  styleUrl: './credit-card-modal.component.scss',
})
export class CreditCardModalComponent {
  @Input() method_id!: number;
  @Input() card_type!: number;
  @Input() i_amount!: number;
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
    private creditCardService: CreditCardService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findAddress(this.method_id);
    this.amount = this.i_amount;
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
      card_type: this.card_type,
      receipt: this.receipt,
      amount: this.amount,
      value: this.value,
    };

    this.creditCardService.makePayment(formData).subscribe({
      next: (res) => {
        this.reset();
        this.isLoading = false;
        this.snackBarService.success(
          'Deposit received and its been processed. This might take some time',
        );

        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/dashboard/credit-cards']);
          });
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

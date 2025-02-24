import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { MethodService } from '../../../services/method.service';
import { environment } from '../../../../environment';
import { DepositModalComponent } from '../../../layouts/deposit-modal/deposit-modal.component';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, DepositModalComponent],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
})
export class DepositComponent implements OnInit {
  apiRootUrl: string = environment.apiRootUrl;
  methods: any;

  isLoading: boolean = false;

  constructor(private methodService: MethodService) {}

  getMethods() {
    this.isLoading = true;
    this.methodService.getMethods().subscribe((methods) => {
      this.methods = methods;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getMethods();
  }

  showModal = false;
  method_id!: number;
  openModal(id: number) {
    this.method_id = id;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

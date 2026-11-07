import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { ThemesService } from '../../../services/themes.service';
import { UserService } from '../../../services/user.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import fa from '@angular/common/locales/fa';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditCardModalComponent } from '../../../layouts/credit-card-modal/credit-card-modal.component';
import { MethodService } from '../../../services/method.service';

@Component({
  selector: 'app-credit-cards',
  standalone: true,
  imports: [
    AngularMaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    CreditCardModalComponent,
  ],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss',
})
export class CreditCardsComponent implements OnInit {
  userData: any;
  isLoading: boolean = false;
  theme: string = '';
  methods: any;
  color: string = '';

  creditCardForm: FormGroup;

  showCard: boolean = false;

  amount: number = 0;

  constructor(
    private themeService: ThemesService,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private methodService: MethodService,
    private fb: FormBuilder,
  ) {
    this.creditCardForm = this.fb.group({
      card_type: ['', Validators.required],
      isCardProcessing: [true, Validators.required],
    });
  }

  getMethods() {
    this.isLoading = true;
    this.methodService.getMethods().subscribe((methods) => {
      this.methods = methods;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.themeService.initTheme();
    this.applyTheme();

    this.getMethods();

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
  }

  applyTheme() {
    this.theme = this.themeService.currentTheme;
    if (this.theme === 'light') {
      this.color = '#fff';
    } else {
      this.color = 'rgba(5, 6, 36, .7)';
    }
  }

  checkCardEligibility(value: string) {
    if (value == '0' && this.userData.is_master_card == 1) {
      this.creditCardForm.get('isCardProcessing')?.setValue(true);
    } else if (value == '1' && this.userData.is_visa_card == 1) {
      this.creditCardForm.get('isCardProcessing')?.setValue(true);
    } else {
      this.creditCardForm.get('isCardProcessing')?.setValue(false);
    }
  }

  onSubmit() {}

  showModal = false;
  method_id!: number;
  openModal(id: number) {
    this.method_id = id;
    this.showModal = true;

    if (this.creditCardForm.get('card_type')?.value == '0') {
      this.amount = this.userData?.master_card_fee;
    } else {
      this.amount = this.userData?.visa_card_fee;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  showCardDetails() {
    this.showCard = !this.showCard;
  }
}

import { Component } from '@angular/core';
import { EmailPinComponent } from './email-pin/email-pin.component';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [EmailPinComponent],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signinForm: FormGroup;

  isLoading: boolean = false;
  preloader: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signinForm = this.fb.group({
      access_id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.signinForm.valid) {
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Form is invalid');
    }
  }
}

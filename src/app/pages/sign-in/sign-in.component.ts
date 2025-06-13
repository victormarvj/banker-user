import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { GoogleTranslateService } from '../../services/google-translate.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;

  isLoading: boolean = false;
  preloader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private googleTranslate: GoogleTranslateService
  ) {
    this.signinForm = this.fb.group({
      access_id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.isAuthUserSignal();
  }

  submitForm() {
    if (this.signinForm.valid) {
      this.isLoading = true;
      const formData = this.signinForm.value;
      this.userService.getCrsfToken().subscribe((res) => {
        this.userService.login(formData).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.userService.setUserSignal(res);

            this.userService.isAuthUserSignal();
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
            this.snackBarService.error(err.error.error);
          },
        });
      });
    } else {
      this.snackBarService.error('Form is invalid');
    }
  }

  @ViewChild('translateParent', { static: true }) translateParent!: ElementRef;
  private translateDivId = 'google_translate_element';
  // 'google_translate_element_' + Math.random().toString(36).substring(2);

  ngAfterViewInit(): void {
    // Create and insert div
    const div = document.createElement('div');
    div.id = this.translateDivId;
    this.translateParent.nativeElement.appendChild(div);

    this.googleTranslate.loadScript().then(() => {
      this.googleTranslate.createWidget(this.translateDivId);
    });
  }

  ngOnDestroy(): void {
    // Clean up
    const div = document.getElementById(this.translateDivId);
    if (div) {
      div.remove();
    }

    this.googleTranslate.unloadScript();
  }
}

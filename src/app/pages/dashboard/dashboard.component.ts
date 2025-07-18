import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AngularFontawesomeModule } from '../../shared/angular-fontawesome/angular-fontawesome.module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { ThemesService } from '../../services/themes.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { GoogleTranslateService } from '../../services/google-translate.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AngularFontawesomeModule,
    AngularMaterialModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('sideNav') sideNav!: MatSidenav;

  theme: string = '';

  userData: any;
  isLoading = false;

  constructor(
    private router: Router,
    private themeService: ThemesService,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private googleTranslate: GoogleTranslateService
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.applyTheme();

    this.activeLink = this.router.url;
    this.title = this.formatUrl(this.activeLink);

    this.userService.getUserDetails().subscribe({
      next: (res) => {
        this.userService.updateUserSignal(res.user);
        this.userData = this.userService.getAuthenticatedUserStorage;

        if (this.userData.email_verified_at === null) {
          this.router.navigate(['/verify-email']);
        } else if (this.userData.pin === null) {
          this.router.navigate(['/transaction-pin']);
        } else if (this.userData.is_verified === 0) {
          this.router.navigate(['/identity-verification']);
        }
      },
      error: (err) => {
        console.log(err);
        this.snackBarService.error(err.error);
      },
    });

    // Alternatively, if you want to listen to changes:
    this.router.events.subscribe(() => {
      this.activeLink = this.router.url;
      this.title = this.formatUrl(this.activeLink);
    });
  }

  // Function to format the URL
  formatUrl(url: string): string {
    // Extract the last segment of the URL
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];

    // Capitalize each word
    return lastSegment
      .split('-') // Split by hyphen or dash if present
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words with space
  }

  faInfoCircle = faInfoCircle;

  sideNavOpened: boolean = true;

  activeLink: string = '';

  isDarkTheme: boolean = false;

  title: string = '';

  toggleMatSideNav() {
    this.sideNav.toggle();
  }

  toggleTheme(event: any) {
    this.themeService.toggleTheme();
    this.applyTheme();
  }

  applyTheme() {
    this.theme = this.themeService.currentTheme;
    this.isDarkTheme = this.theme === 'dark' ? true : false;
  }

  @ViewChild('translateParent', { static: true }) translateParent!: ElementRef;
  private translateDivId = 'google_translate_element';

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

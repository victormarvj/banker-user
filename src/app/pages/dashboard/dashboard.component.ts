import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { AngularFontawesomeModule } from '../../shared/angular-fontawesome/angular-fontawesome.module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AngularFontawesomeModule,
    AngularMaterialModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('sideNav') sideNav!: MatSidenav;

  constructor(private router: Router) {
    if (!this.isVerified) {
      this.router.navigate(['/identity-verification']);
    } else if (!this.isEmailVerified) {
      this.router.navigate(['/verify-email']);
    }
  }

  faInfoCircle = faInfoCircle;

  sideNavOpened: boolean = true;

  isVerified: boolean = true;
  isEmailVerified = true;

  activeLink: string = 'dashboard';

  isDarkTheme: boolean = false;

  toggleMatSideNav() {
    this.sideNav.toggle();
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  toggleTheme(event: any) {
    this.isDarkTheme = !this.isDarkTheme;
    const themeClass = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(themeClass);
    console.log(themeClass);
  }
}

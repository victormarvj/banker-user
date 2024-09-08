import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { AngularFontawesomeModule } from '../../shared/angular-fontawesome/angular-fontawesome.module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { ThemesService } from '../../services/themes.service';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private themeService: ThemesService) {
    if (!this.isVerified) {
      this.router.navigate(['/identity-verification']);
    } else if (!this.isEmailVerified) {
      this.router.navigate(['/verify-email']);
    }
  }

  ngOnInit(): void {
    this.themeService.initTheme();
    this.applyTheme();
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
    this.themeService.toggleTheme();
    this.applyTheme();
  }

  applyTheme() {
    this.theme = this.themeService.currentTheme;
    this.isDarkTheme = this.theme === 'dark' ? true : false;
  }
}

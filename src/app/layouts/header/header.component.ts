import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { AngularFontawesomeModule } from '../../shared/angular-fontawesome/angular-fontawesome.module';

import { faBell, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    AngularFontawesomeModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faBars = faBars;
  faCog = faCog;
  faBell = faBell;

  @Input() theme: string = '';
}

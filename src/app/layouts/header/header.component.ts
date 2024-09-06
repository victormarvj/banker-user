import { Component, EventEmitter, Output } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { AngularFontawesomeModule } from '../../shared/angular-fontawesome/angular-fontawesome.module';

import { faBell, faCog, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AngularMaterialModule, AngularFontawesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faBars = faBars;
  faCog = faCog;
  faBell = faBell;

  @Output('toggleMatSideNav') toggleMatSideNav = new EventEmitter<void>();

  toggleSideNav() {
    this.toggleMatSideNav.emit();
  }
}

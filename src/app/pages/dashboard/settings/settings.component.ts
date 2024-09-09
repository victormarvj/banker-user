import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  // isBrowser: any;
  // constructor(@Inject(PLATFORM_ID) private platformId: any) {
  //   this.isBrowser(isPlatformBrowser(this.platformId));
  // }
}

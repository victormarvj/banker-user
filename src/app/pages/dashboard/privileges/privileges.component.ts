import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './privileges.component.html',
  styleUrl: './privileges.component.scss',
})
export class PrivilegesComponent {}

import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss',
})
export class LoansComponent {}

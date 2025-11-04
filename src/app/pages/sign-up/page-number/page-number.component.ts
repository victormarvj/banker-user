import { Component, Input } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-number',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './page-number.component.html',
  styleUrl: './page-number.component.scss',
})
export class PageNumberComponent {
  @Input() isActive: number = 0;
  @Input() isPassed: number = 0;
}

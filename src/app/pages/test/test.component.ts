import { Component } from '@angular/core';
import { FrontImageUploadComponent } from '../../components/front-image-upload/front-image-upload.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FrontImageUploadComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {}

import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  imagePreview: string | ArrayBuffer | null = null;
  videoName: string = '';

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onVideoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.videoName = file.name;
    }
  }
}

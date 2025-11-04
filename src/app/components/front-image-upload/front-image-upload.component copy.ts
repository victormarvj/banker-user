import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-front-image-upload',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './front-image-upload.component.html',
  styleUrl: './front-image-upload.component.scss',
})
export class FrontImageUploadComponent {
  frontImagePreview: string | ArrayBuffer | null = null;
  uploadProgress: number = 0; // For tracking the upload progress

  constructor(
    private fileUploadService: FileUploadService,
    private snackBarService: SnackBarService
  ) {}

  @Input() imageType: string = '';
  @Output() onFrontImageUpload = new EventEmitter<any>();

  frontImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.frontImagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();

      formData.append('image', file);
      // Reset upload progress
      this.uploadProgress = 0;

      this.fileUploadService.uploadImage(formData).subscribe({
        next: (res) => {
          this.onFrontImageUpload.emit(res.url);
          this.snackBarService.success('Document front uploaded');
        },
        error: (err) => {
          this.snackBarService.error(err);
        },
      });
    }
  }
}

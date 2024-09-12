import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-back-image-upload',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './back-image-upload.component.html',
  styleUrl: './back-image-upload.component.scss',
})
export class BackImageUploadComponent {
  backImagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fileUploadService: FileUploadService,
    private snackBarService: SnackBarService
  ) {}

  @Input() imageType: string = '';
  @Output() onBackImageUpload = new EventEmitter<any>();

  backImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.backImagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();

      formData.append('image', file);

      this.fileUploadService.uploadImage(formData).subscribe({
        next: (res) => {
          this.onBackImageUpload.emit(res.url);
          this.snackBarService.success('Document back uploaded');
        },
        error: (err) => {
          this.snackBarService.error(err);
        },
      });
    }
  }
}

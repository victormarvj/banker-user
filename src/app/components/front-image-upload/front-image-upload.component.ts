import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';
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
export class FrontImageUploadComponent implements OnDestroy {
  frontImagePreview: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;
  interval: any;

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
      this.uploadProgress = 0;

      this.fileUploadService.uploadImage(formData).subscribe({
        next: (res) => {
          // Start the interval to increment the progress bar
          this.interval = setInterval(() => {
            this.uploadProgress += 20;

            if (this.uploadProgress >= 100) {
              this.uploadProgress = 100; // Ensure it caps at 100
              this.clearUploadProgressInterval();
              this.onFrontImageUpload.emit(res.url);
              this.snackBarService.success('Document front uploaded');
            }
          }, 500); // Increment every 1 second
        },
        error: (err) => {
          this.snackBarService.error(err);
          this.clearUploadProgressInterval(); // Clear interval on error
        },
      });
    }
  }

  // Clear the interval function
  clearUploadProgressInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // Cleanup interval when component is destroyed
  ngOnDestroy(): void {
    this.clearUploadProgressInterval();
  }
}

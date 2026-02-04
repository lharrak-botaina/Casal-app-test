import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private toastrService: ToastrService) {}

  imageToBase64(image) {
    if (
      !image ||
      (image && image.type != 'image/png' && image.type != 'image/jpeg')
    ) {
      this.toastrService.error('Only PNG and JPEG format are supported');
      return null;
    }

    return this.fileToBase64(image);
  }

  pdfToBase64(pdf) {
    if (!pdf || (pdf && pdf.type != 'application/pdf')) {
      this.toastrService.error('Only PDF format is supported');
      return null;
    }

    return this.fileToBase64(pdf);
  }

  private fileToBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.toString());
      };
      reader.onerror = (error) => {
        reject(null);
      };
    });
  }
}

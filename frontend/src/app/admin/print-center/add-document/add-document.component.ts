import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaxSizeValidator } from 'src/app/core/validators/file-validators';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { DocumentService } from 'src/app/core/services/document.service';

@Component({
    selector: 'app-add-document',
    templateUrl: './add-document.component.html',
    styleUrls: ['./add-document.component.scss'],
    standalone: false
})
export class AddDocumentComponent implements OnInit {
  FILE_MAX_SIZE = 1024 * 4096; // 4Mb

  DOC_FORM = this.fb.group({
    name: ['', [Validators.required]],
    document: ['', [Validators.required, MaxSizeValidator(this.FILE_MAX_SIZE)]],
  });

  @ViewChild('form') form: FormGroupDirective;

  constructor(
    private fb: UntypedFormBuilder,
    private documentService: DocumentService,
    private toastrService: ToastrService,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async add() {
    this.DOC_FORM.value.document = await this.pdfToBase64(
      this.DOC_FORM.value.document
    );

    this.documentService
      .add({
        ...this.DOC_FORM.value,
      })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Document ajouté avec succès');
            this.router.navigate(['/casal/print']);
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  private async pdfToBase64(pdfInput) {
    if (!!pdfInput?._files)
      return await this.photoService.pdfToBase64(pdfInput._files[0]);
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { Association } from 'src/app/core/models/association';
import { Data } from 'src/app/core/models/dropdown_data';
import { AssociationService } from 'src/app/core/services/association.service';
import { EditAssociationPasswordComponent } from './edit-association-password/edit-association-password.component';
import { EditAssociationPhotosComponent } from './edit-association-photos/edit-association-photos.component';

@Component({
    selector: 'app-edit-association',
    templateUrl: './edit-association.component.html',
    styleUrls: ['./edit-association.component.scss'],
    standalone: false
})
export class EditAssociationComponent implements OnInit {
  association: Association =
    !window?.history?.state?._id ? null : window?.history?.state;

  currentId;
  CITIES = Data.CITIES;
  public maxDate = new Date();

  SOCIAL_MEDIA_FORM = this.fb.group({
    facebook: [this.association?.socialMedia?.facebook],
    twitter: [this.association?.socialMedia?.twitter],
    instagram: [this.association?.socialMedia?.instagram],
    linkedIn: [this.association?.socialMedia?.linkedIn],
  });

  TIP_FORM = this.fb.group({
    fullname: [this.association?.tip?.fullname, [Validators.required]],
    email: [
      this.association?.tip?.email,
      [Validators.required, , Validators.email],
    ],
    phone: [this.association?.tip?.phone, [Validators.required]],
  });

  ASSOCIATION_FORM = this.fb.group({
    raisonSocial: [
      this.association?.raisonSocial,
      [Validators.required, Validators.minLength(1)],
    ],
    name: [this.association?.name, [Validators.required]],
    address: [this.association?.address],
    city: [this.association?.city, Validators.required],
    webSite: [this.association?.webSite],
    socialMedia: this.SOCIAL_MEDIA_FORM,
    description: [this.association?.description],
    tip: this.TIP_FORM,
    collaborationDate: [this.association?.collaborationDate],
    creationDate: [this.association?.creationDate],
  });

  constructor(
    private associationService: AssociationService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentId = this.activatedRoute?.snapshot?.paramMap?.get('id');
    if (!this.association)
      this.loadAssociation(this.currentId);
  }

  loadAssociation(id) {
    this.associationService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (association) => {
            this.association = association;
            this.fillFormValues(association);
          }
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  edit() {
    this.associationService.edit(this.currentId, this.ASSOCIATION_FORM.value)
    .pipe(
      first(),
      tap({
        next: () => {
          this.toastrService.success('Association Modifiée avec succès');
          this.router.navigate([`casal/association/${this.currentId}`]);
        },
      }),
      catchError((err) => {
        this.toastrService.error(err);
        return throwError(err);
      })
    )
    .subscribe();
  }

  editPassword() {
    this.dialog.open(EditAssociationPasswordComponent, {
      data: {
        _id: this.currentId
      }
    });
  }

  editLogo() {
    this.dialog.open(EditAssociationPhotosComponent, {
      data: {
        _id: this.currentId,
        description : 'AssociationLogo'
      }
    });
  }

  editTipPhto() {
    this.dialog.open(EditAssociationPhotosComponent, {
      data: {
        _id: this.currentId,
        description : 'TipPhoto'
      }
    });
  }

  private fillFormValues(association: Association) {
    var {_id, __v, email, userId, logo, updatedAt, createdAt, ...associationData} = association;
    var {_id, photo, ...tipData} = association.tip;
    var {_id, ...socialMediaData} = association.socialMedia;

    const formValues = { ...associationData, tip : {...tipData}, socialMedia : {...socialMediaData}};
    this.ASSOCIATION_FORM.setValue({...formValues});
  }
}

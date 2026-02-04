import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  LOGIN_FORM = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.authService.user$.pipe(
      first(),
      tap(user => {
        if (user && user.role == 'admin') this.router.navigate(['/casal/home']);
        if (user && user.role == 'association') this.router.navigate(['/association/young']);
        if (user && user.role == 'company') this.router.navigate(['/company/young']);
      })
    )
    .subscribe();
  }

  signIn() {
    if (this.LOGIN_FORM.dirty && this.LOGIN_FORM.valid) {
      this.authService
        .signIn(this.LOGIN_FORM.value.email, this.LOGIN_FORM.value.password)
        .pipe(
          first(),
          catchError((err) => {
            this._snackBar.open(err, '', {
              duration: 3000,
            });
            return throwError(err);
          })
        )
        .subscribe((user: any) => {
          if(user && user.role == "admin")
            this.router.navigate(['/casal'])
          else if(user && user.role == "association")
            this.router.navigate(['/association'])
          else if(user && user.role == "company")
            this.router.navigate(['/company'])
        });
    }
  }
}

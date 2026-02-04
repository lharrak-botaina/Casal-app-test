import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AssociationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      map(user => {
        if (user?.role == "association") return true;
      
        this.toastr.error('You cannot enter this area');
      })
    )
  }
}

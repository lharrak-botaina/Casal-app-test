import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
    selector: '[rbacAllow]',
    standalone: false
})
export class RbacAllowDirective implements OnDestroy {

  allowedRoles : string[];
  user : User;

  sub : Subscription;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private authService: AuthenticationService) { 
                this.sub = authService.user$.subscribe(
                  user => {
                      this.user = user;
                      this.showIfUserAllowed();
                  });
              }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  @Input()
  set rbacAllow(allowedRoles: string[]) {
      this.allowedRoles = allowedRoles;
      this.showIfUserAllowed();
  }

  showIfUserAllowed() {

    if (!this.allowedRoles || this.allowedRoles.length === 0 ||
        !this.user) {
        this.viewContainer.clear();
        return;
    }

    const isUserAllowed = this.allowedRoles.includes(this.user?.role);

    if (isUserAllowed) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
        this.viewContainer.clear();
    }

}
        

}

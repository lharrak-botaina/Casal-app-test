import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  showToolbar = true;
  constructor(private authService: AuthenticationService, private router: Router) {
    authService.isConnected().pipe(take(1)).subscribe();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showToolbar = !event.url.includes('signIn');
    });
  }
}

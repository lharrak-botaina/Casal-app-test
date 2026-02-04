import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
    authService.isConnected().pipe(take(1)).subscribe();
  }
}

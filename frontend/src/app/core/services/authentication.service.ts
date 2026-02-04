import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { map, filter, tap, shareReplay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const ANONYMOUS_USER: User = {
  _id: null,
  name: null,
  role: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.subject
    .asObservable().pipe(filter(user => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user?._id));

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );

  constructor(private http: HttpClient, private router: Router) {}

  signIn(email: string, password: string) {
    return this.http
      .post<User>('signin', { email, password })
      .pipe(
        shareReplay(),
        tap({
          next: (user) => this.subject.next(user),
        })
      );
  }

  isConnected() {
    return this.http.get<User>('users/connected').pipe(
      shareReplay(),
      tap({
        next: (user) => {
          this.subject.next(user);
          if (user && user.role == 'admin' && this.router?.url == '/') this.router.navigate(['/casal/home']);
          if (user && user.role == 'association' && this.router?.url == '/') this.router.navigate(['/association/young']);
          if (user && user.role == 'company' && this.router?.url == '/') this.router.navigate(['/company/young']);
        },
      }),
      catchError((err) => {
        this.subject.next(ANONYMOUS_USER);
        this.router.navigate(['/signIn']);
        return of([]);
      })
    );
  }

  signOut() {
    return this.http.post('signout', null).pipe(
      shareReplay(),
      tap({
        next: (_) => {
          this.subject.next(ANONYMOUS_USER);
          this.router.navigate(['/signIn']);
        },
      })
    );
  }
}

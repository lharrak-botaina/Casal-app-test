import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, first } from 'rxjs/operators';

import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  user$: Observable<User>;
  unreadCount$: Observable<number>;

  expandedMenu: string | null = null;
  sidebarOpen = false;
  profileDropdownOpen = false;

  @HostBinding('class.sidebar-open') get isSidebarOpen() {
    return this.sidebarOpen;
  }

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedOut$ = this.authService.isLoggedOut$;
    this.user$ = this.authService.user$;
    this.unreadCount$ = this.notificationService.unreadCount$;

    // Load unread count whenever user (or role) changes
    this.user$
      .pipe(
        filter((user): user is User => !!user && !!user.role),
        switchMap(user =>
          this.notificationService.getUnreadCount(
            user.role === 'admin' ? 'admin' : 'association'
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu(menuName: string): void {
    if (this.expandedMenu === menuName) {
      this.expandedMenu = null;
    } else {
      this.expandedMenu = menuName;
    }
  }

  isMenuExpanded(menuName: string): boolean {
    return this.expandedMenu === menuName;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleProfileDropdown(): void {
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }

  closeProfileDropdown(): void {
    this.profileDropdownOpen = false;
  }

  signOut(): void {
    this.notificationService.resetUnreadCount();

    this.authService
      .signOut()
      .pipe(first())
      .subscribe();
  }
}

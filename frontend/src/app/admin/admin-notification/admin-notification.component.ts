import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Notification } from 'src/app/core/models/notification';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss'],
  standalone: false
})
export class AdminNotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  totalCount = 0;

  first = 0;
  pageSize = 10;
  pageIndex = 0;
  currentFilter: 'all' | 'unread' | 'read' = 'all';

  loading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* ================== DATA ================== */

  loadNotifications(): void {
    this.loading = true;

    this.notificationService
      .find(this.pageIndex, this.pageSize, this.currentFilter, 'admin')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ notifications, totalCount }) => {
          this.notifications = notifications;
          this.totalCount = totalCount;
          this.loading = false;
        },
        error: () => (this.loading = false)
      });
  }

  onPaginatorChange(event: any): void {
    this.first = event.first;
    this.pageSize = event.rows;
    this.pageIndex = event.page;
    this.loadNotifications();
  }

  onFilterChange(filter: 'all' | 'unread' | 'read'): void {
    this.currentFilter = filter;
    this.pageIndex = 0;
    this.first = 0;
    this.loadNotifications();
  }

  /* ================== ACTIONS ================== */

  markAsRead(notification: Notification, event: Event): void {
    event.stopPropagation();
    if (notification.viewed) return;

    notification.viewed = true; // optimistic UI

    this.notificationService
      .markAsRead(notification._id, 'admin')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: () => (notification.viewed = false)
      });
  }

  markAllAsRead(): void {
    this.notificationService
      .markAllAsRead('admin')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.notifications.forEach(n => (n.viewed = true));
      });
  }

  deleteNotification(notification: Notification, event: Event): void {
    event.stopPropagation();

    this.notificationService
      .delete(notification._id, 'admin')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.notifications = this.notifications.filter(n => n._id !== notification._id);
        this.totalCount = Math.max(this.totalCount - 1, 0);
      });
  }

  navigateToJob(notification: Notification): void {
    if (!notification.viewed) {
      notification.viewed = true;

      this.notificationService
        .markAsRead(notification._id, 'admin')
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          error: () => (notification.viewed = false)
        });
    }

    const jobId =
      typeof notification.jobId === 'string'
        ? notification.jobId
        : notification.jobId?._id;

    if (jobId) {
      this.router.navigate(['/casal/job', jobId]);
    }
  }

  /* ================== UI HELPERS ================== */

  getJobTitle(notification: Notification): string {
    return typeof notification.jobId === 'object'
      ? notification.jobId?.title ?? ''
      : '';
  }

  getJobReference(notification: Notification): string {
    return typeof notification.jobId === 'object'
      ? notification.jobId?.reference ?? ''
      : '';
  }

  getSharedWithNames(notification: Notification): string {
    return notification.sharedWith?.length
      ? notification.sharedWith.map(a => a.raisonSocial).join(', ')
      : 'Aucune association';
  }

  getActionMessage(notification: Notification): string {
    const companyName = notification.company?.name || 'Une entreprise';

    switch (notification.actionType) {
      case 'created':
        return `${companyName} a créé une nouvelle offre d'emploi`;
      case 'updated':
        return `${companyName} a mis à jour une offre d'emploi`;
      case 'archived':
        return `${companyName} a archivé une offre d'emploi`;
      default:
        return `${companyName} a partagé une offre d'emploi`;
    }
  }

  getActionIcon(actionType: string): string {
    switch (actionType) {
      case 'created':
        return 'add_circle';
      case 'updated':
        return 'edit';
      case 'archived':
        return 'archive';
      default:
        return 'notifications';
    }
  }
}

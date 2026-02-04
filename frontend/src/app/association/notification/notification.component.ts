import { first } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Notification, NotifJob } from 'src/app/core/models/notification';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: false
})
export class NotificationComponent implements OnInit, OnDestroy {
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

  loadNotifications(): void {
    this.loading = true;
    this.notificationService.find(this.pageIndex, this.pageSize, this.currentFilter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.notifications = response.notifications;
          this.totalCount = response.totalCount;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
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

  markAsRead(notification: Notification, event: Event): void {
    event.stopPropagation();
    if (!notification.viewed) {
      this.notificationService.markAsRead(notification._id)
        .pipe(first())
        .subscribe(() => {
          notification.viewed = true;
          // Refresh the unread count
          this.notificationService.getUnreadCount().pipe(first()).subscribe();
        });
    }
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead()
      .pipe(first())
      .subscribe(() => {
        this.notifications.forEach(n => n.viewed = true);
        // Refresh the unread count
        this.notificationService.getUnreadCount().pipe(first()).subscribe();
      });
  }

  deleteNotification(notification: Notification, event: Event): void {
    event.stopPropagation();
    this.notificationService.delete(notification._id)
      .pipe(first())
      .subscribe(() => {
        this.notifications = this.notifications.filter(n => n._id !== notification._id);
        this.totalCount--;
        // Refresh the unread count
        this.notificationService.getUnreadCount().pipe(first()).subscribe();
      });
  }

  navigateToJob(notification: Notification): void {
    // Mark as read when clicking
    if (!notification.viewed) {
      notification.viewed = true; // Update local state immediately
      this.notificationService.markAsRead(notification._id).pipe(first()).subscribe(() => {
        // Refresh the unread count
        this.notificationService.getUnreadCount().pipe(first()).subscribe();
      });
    }
    const jobId = typeof notification.jobId === 'string' ? notification.jobId : notification.jobId._id;
    this.router.navigate(['/association/jobs', jobId]);
  }

  getJobTitle(notification: Notification): string {
    if (typeof notification.jobId === 'object' && notification.jobId?.title) {
      return notification.jobId.title;
    }
    return '';
  }

  getJobReference(notification: Notification): string {
    if (typeof notification.jobId === 'object' && notification.jobId?.reference) {
      return notification.jobId.reference;
    }
    return '';
  }

  getActionMessage(notification: Notification): string {
    const companyName = notification.company?.name || 'Une entreprise';
    switch (notification.actionType) {
      case 'created':
        return `${companyName} a partagé une nouvelle offre d'emploi`;
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

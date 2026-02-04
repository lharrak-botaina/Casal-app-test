import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { NotificationResponse, UnreadCountResponse } from '../models/notification';

type Role = 'association' | 'admin';
type Filter = 'all' | 'unread' | 'read';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseUrl = 'notifications';

  private unreadCountSubject = new BehaviorSubject<number>(0);
  readonly unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  /* ================== HELPERS ================== */

  private buildParams(
    pageNumber: number,
    pageSize: number,
    filter: Filter
  ): HttpParams {
    return new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('filter', filter);
  }

  private updateUnreadCount(count: number): void {
    this.unreadCountSubject.next(Math.max(count, 0));
  }

  private decrementUnreadCount(): void {
    this.updateUnreadCount(this.unreadCountSubject.value - 1);
  }

  private rolePath(role?: Role): string {
    return role === 'admin' ? `${this.baseUrl}/admin` : this.baseUrl;
  }

  /* ================== FIND ================== */

  find(
    pageNumber = 0,
    pageSize = 20,
    filter: Filter = 'all',
    role: Role = 'association'
  ): Observable<NotificationResponse> {
    return this.http.get<NotificationResponse>(
      this.rolePath(role),
      { params: this.buildParams(pageNumber, pageSize, filter) }
    );
  }

  /* ================== UNREAD COUNT ================== */

  getUnreadCount(role: Role = 'association'): Observable<UnreadCountResponse> {
    return this.http
      .get<UnreadCountResponse>(`${this.rolePath(role)}/unread-count`)
      .pipe(tap(res => this.updateUnreadCount(res.count)));
  }

  /* ================== MARK AS READ ================== */

  markAllAsRead(role: Role = 'association'): Observable<void> {
    return this.http.put<void>(this.rolePath(role), {}).pipe(
      tap(() => this.updateUnreadCount(0))
    );
  }

  markAsRead(id: string, role: Role = 'association'): Observable<void> {
    return this.http
      .put<void>(`${this.rolePath(role)}/${id}/read`, {})
      .pipe(tap(() => this.decrementUnreadCount()));
  }

  /* ================== DELETE ================== */

  delete(id: string, role: Role = 'association'): Observable<void> {
    return this.http.delete<void>(`${this.rolePath(role)}/${id}`);
  }

  /* ================== COMMON ================== */

  resetUnreadCount(): void {
    this.unreadCountSubject.next(0);
  }
}

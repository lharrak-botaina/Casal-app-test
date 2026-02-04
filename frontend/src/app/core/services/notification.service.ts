import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}


  find(pageNumber = 0, pageSize = 20): Observable<Notification> {
    let params = {pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<Notification>('notifications', { params }).pipe(shareReplay());
  }

  viewed(): Observable<any> {
    return this.http.put<any>('notifications', {});
  }
}

import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, AfterViewInit {
  notifications$ : Observable<Notification>;
  constructor(private noticationService : NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngAfterViewInit(): void {
    this.noticationService.viewed().pipe(first()).subscribe();
  }

  loadNotifications(){
    this.notifications$ = this.noticationService.find();
  }

}

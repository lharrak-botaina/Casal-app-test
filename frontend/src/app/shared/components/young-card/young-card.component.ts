import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Young, YoungResult } from 'src/app/core/models/young';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-young-card',
  templateUrl: './young-card.component.html',
  styleUrls: ['./young-card.component.scss'],
})
export class YoungCardComponent implements OnInit {
  @Input() youth$: Observable<YoungResult>;
  @Input() isFull : boolean = true;

  host = environment.host;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  navigate(young: Young) {
    this.isFull 
    ? this.router.navigate(['./', young?._id], { relativeTo: this.activatedRoute, state : young })
    : this.router.navigate(['./', young?._id], { relativeTo: this.activatedRoute })
  }
}

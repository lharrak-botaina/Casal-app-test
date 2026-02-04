import { first, tap } from 'rxjs/operators';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import jsPDF, { CellConfig } from 'jspdf';
import { Observable } from 'rxjs';
import { AssociationResult } from 'src/app/core/models/association';
import { PrintService } from 'src/app/core/services/print.service';

@Component({
    selector: 'app-basic-stats',
    templateUrl: './basic-stats.component.html',
    styleUrls: ['./basic-stats.component.scss'],
    standalone: false
})
export class BasicStatsComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() data$: Observable<any>;
  @Input() id: number;
  @Input() extraText: string = '';
  @Input() displayFilter: boolean = true;
  @Input() associations: AssociationResult;
  @Input() description : string;

  @Output() panelOpened: EventEmitter<number> = new EventEmitter();
  @Output() associationChanged: EventEmitter<any> = new EventEmitter();

  FORM = this.fb.group({
    association: [''],
  });

  statsValue: number;

  constructor(private fb: UntypedFormBuilder, private printService : PrintService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.data$
      ?.pipe(
        first(),
        tap((data) => (this.statsValue = data?.result))
      )
      .subscribe();
  }

  opened() {
    this.panelOpened.emit(this.id);
  }

  onChangeAssociation(event) {
    let data = { associationId: event?.value, panelId: this.id };
    this.associationChanged.emit(data);
  }

  downloadPDF() {
    this.printService.downloadBasicStatsPDF(this.title, this.description, this.statsValue, this.extraText);
  }
}

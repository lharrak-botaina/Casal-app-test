import { DefaultStat } from './../../core/models/charts_data';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationResult } from 'src/app/core/models/association';
import { FormBuilder } from '@angular/forms';
import { PrintService } from 'src/app/core/services/print.service';

@Component({
  selector: 'app-pie-chart-two',
  templateUrl: './pie-chart-two.component.html',
  styleUrls: ['./pie-chart-two.component.scss'],
})
export class PieChartTwoComponent implements OnInit {
  @Input() title: string;
  @Input() data$: Observable<DefaultStat>;
  @Input() id: number;
  @Input() associations: AssociationResult;
  @Input() description : string;

  @Output() panelOpened: EventEmitter<number> = new EventEmitter();
  @Output() associationChanged: EventEmitter<any> = new EventEmitter();
  view: any[] = [700, 400];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#1848f7', '#f7eb04'],
  };

  FORM = this.fb.group({
    association: [''],
  });

  @ViewChild('report') report: ElementRef;

  constructor(private fb: FormBuilder, private printService : PrintService) {}

  ngOnInit(): void {}

  opened() {
    this.panelOpened.emit(this.id);
  }

  onChangeAssociation(event) {
    let data = { associationId: event?.value, panelId: this.id };
    this.associationChanged.emit(data);
  }

  downloadPDF() {
    this.printService.downloadPieChartPDF(this.report, this.title, this.description, 200);
  }
}

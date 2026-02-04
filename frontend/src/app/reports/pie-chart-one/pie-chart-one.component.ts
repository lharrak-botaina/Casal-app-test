import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AssociationResult } from 'src/app/core/models/association';
import { StatsData } from 'src/app/core/models/charts_data';
import { PrintService } from 'src/app/core/services/print.service';

@Component({
  selector: 'app-pie-chart-one',
  templateUrl: './pie-chart-one.component.html',
  styleUrls: ['./pie-chart-one.component.scss'],
})
export class PieChartOneComponent implements OnInit {
  @Input() title: string;
  @Input() data$: Observable<StatsData>;
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

  FORM = this.fb.group({
    association: [''],
  });

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#1848f7', '#f7eb04'],
  };

  @ViewChild('report') report: ElementRef;

  constructor(private fb: FormBuilder, private printservice : PrintService) {}

  ngOnInit(): void {}

  opened() {
    this.panelOpened.emit(this.id);
  }

  onChangeAssociation(event) {
    let data = { associationId: event?.value, panelId: this.id };
    this.associationChanged.emit(data);
  }

  downloadPDF() {
    this.printservice.downloadPieChartPDF(this.report, this.title, this.description, 250);
  }
}

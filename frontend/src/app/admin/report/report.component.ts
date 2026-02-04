import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { PrintService } from 'src/app/core/services/print.service';
import { StatsService } from 'src/app/core/services/stats.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    standalone: false
})
export class AdminReportComponent implements OnInit {
  numberOfYoungAddedStats$;
  numberOfYouthHaveMoreThanThreeCapacityBuildingStats$;
  numberOfYouthHavePassworkTrainingStats$;
  numberOfFormalInsertionStats$;
  numberOfInformalInsertionStats$;
  numberOfInsertionsByActivityAreaStats$;
  numberOfInsertionsByContractTypeStats$;
  numberOfInsertionsByContractDurationStats$;
  numberOfInsertionsBySalaryStats$;
  numberOfCompanies$;
  numberOfInvolvedCompaniesStats$;
  numberOfPassworks$;
  numberOfInsertionByCDIContract$;
  numberOfInsertionByCDDContract$;
  numberOfInsertionByCTTContract$;
  numberOfInsertionByAnapecContract$;
  percentageInsertionByTotalYouth$;
  percentageInsertionByCapacityBuilding$;
  percentageInsertionByPasswork$;

  chartsList: { id; title; description?; data$?; type?; elementRef?; value?, extraText? }[] = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#1848f7', '#f7eb04'],
  };

  @ViewChildren('pieChartOne') pieChartOneList: QueryList<ElementRef>;
  @ViewChildren('pieChartTwo') pieChartTwoList: QueryList<ElementRef>;

  constructor(
    private statsService: StatsService,
    private changeDetector: ChangeDetectorRef,
    private printService : PrintService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.chartsList = [
      {
        id: 1,
        title: 'Nombre de jeunes accueillis par les GIP',
        data$: this.numberOfYoungAddedStats$,
        type: 1,
        description : 'Les jeunes, filles et garçons, en recherche d\'emploi, prioritairement sont des NEET, sont accueillis et informés sur les services assurés par les Guichets d\'Insertion Professionnelle (GIP).'
      },
      {
        id: 2,
        title:
          'Nombre de jeunes bénéficiaires des ateliers de renforcement de capacités (min 4)',
        data$: this.numberOfYouthHaveMoreThanThreeCapacityBuildingStats$,
        type: 1,
        description : 'Les jeunes accueillis auparavant par les TIP, et ayant bénéficié d\'un bilan de compétences personnelles et professionnelles.'
      },
      {
        id: 3,
        title:
          'Nombre de jeunes bénéficiaires des formations professionnelles PW',
        data$: this.numberOfYouthHavePassworkTrainingStats$,
        type: 1,
        description : 'Les jeunes inscrits dans la base de données des GIP, ayant besoin d\'une formation professionnelle avant d\'être insérés en entreprises.'
      },
      {
        id: 4,
        title: 'Nombre d’insertions formelle',
        data$: this.numberOfFormalInsertionStats$,
        type: 1,
        description : 'Les jeunes insérés en entreprises avec contrat de travail formel à durée minimale de 3 mois , déclaré à la CNSS, ayant un salaire plus ou égale au SMIG.'
      },
      {
        id: 5,
        title: 'Nombre d’insertions Informelle',
        data$: this.numberOfInformalInsertionStats$,
        type: 1,
        description : 'Les jeunes insérés en entreprises sans contrats de travail, ou non déclarés à la CNSS.'
      },
      {
        id: 11,
        title: 'Pourcentages d’insertion en CDI',
        data$: this.numberOfInsertionByCDIContract$,
        type: 1,
      },
      {
        id: 12,
        title: 'Pourcentages d’insertion en CDD',
        data$: this.numberOfInsertionByCDDContract$,
        type: 1,
      },
      {
        id: 13,
        title: 'Pourcentages d’insertion en CTT',
        data$: this.numberOfInsertionByCTTContract$,
        type: 1,
      },
      {
        id: 14,
        title: 'Pourcentages d’insertion en Anapec',
        data$: this.numberOfInsertionByAnapecContract$,
        type: 1,
      },
      {
        id: 6,
        title: "Nombre d'insertions par secteur d'activités",
        data$: this.numberOfInsertionsByActivityAreaStats$,
        type: 2,
        description : 'Répartition de l\'ensemble des insertions effectuées par les TIP par secteur d\'activités.'
      },
      {
        id: 7,
        title: 'Pourcentage d’insertion selon le type de contrat',
        data$: this.numberOfInsertionsByContractTypeStats$,
        type: 2,
        description : 'Répartition de l\'ensemble des insertions effectuées par les TIP selon le type de contrat signé.'
      },
      {
        id: 8,
        title: 'Pourcentage d’insertions par durée de contrat',
        data$: this.numberOfInsertionsByContractDurationStats$,
        type: 2,
        description : 'Répartition de l\'ensemble des insertions effectuées par les TIP selon la durée de contrat signé.'
      },
      {
        id: 9,
        title: 'Insertions par fourchette de salaire',
        data$: this.numberOfInsertionsBySalaryStats$,
        type: 2,
        description : 'Répartition de l\'ensemble des insertions effectuées par les TIP selon le montant des salaires.'
      }
    ];
    this.getNumberOfCompaniesValue();
    this.getNumberOfPassworksValue();
    this.getPercentageInsertionByCapacityBuildingValue();
    this.getPercentageInsertionByPassworkValue();
    this.getPercentageInsertionByTotalYouthValue();
  }

  loadStats() {
    //BAD IMPLEMENTATION; MUST TO BE CHANGED
    this.numberOfYoungAddedStats$ =
      this.statsService.getNumberOfYoungAddedStats('');
    this.numberOfYouthHaveMoreThanThreeCapacityBuildingStats$ =
      this.statsService.getNumberOfYouthHaveMoreThreeFourCapacityBuildingStats(
        ''
      );
    this.numberOfYouthHavePassworkTrainingStats$ =
      this.statsService.getNumberOfYouthHavePassworkTrainingStats('');
    this.numberOfFormalInsertionStats$ =
      this.statsService.getNumberOfFormalInsertionStats('');
    this.numberOfInformalInsertionStats$ =
      this.statsService.getNumberOfInformalInsertionStats('');
    this.numberOfInsertionsByActivityAreaStats$ =
      this.statsService.getNumberOfInsertionsByActivityAreaStats('');
    this.numberOfInsertionsByContractTypeStats$ =
      this.statsService.getNumberOfInsertionsByContractTypeStats('');
    this.numberOfInsertionsByContractDurationStats$ =
      this.statsService.getNumberOfInsertionsByContractDurationStats('');
    this.numberOfInsertionsBySalaryStats$ =
      this.statsService.getNumberOfInsertionsBySalaryStats('');
    this.numberOfCompanies$ = this.statsService.getNumberOfCompaniesStats('');
    this.numberOfInvolvedCompaniesStats$ =
      this.statsService.getNumberOfInvolvedCompaniesStats('');
    this.numberOfPassworks$ = this.statsService.getNumberOfPassworksStats('');
    this.numberOfInsertionByCDIContract$ =
      this.statsService.getNumberOfInsertionByContractStats('CDI', '');
    this.numberOfInsertionByCDDContract$ =
      this.statsService.getNumberOfInsertionByContractStats('CDD', '');
    this.numberOfInsertionByCTTContract$ =
      this.statsService.getNumberOfInsertionByContractStats('CTT', '');
    this.numberOfInsertionByAnapecContract$ =
      this.statsService.getNumberOfInsertionByContractStats('Anapec', '');
    this.percentageInsertionByTotalYouth$ =
      this.statsService.getPercentageInsertionByTotalYouth('');
    this.percentageInsertionByCapacityBuilding$ =
      this.statsService.getPercentageInsertionByCapacityBuilding('');
    this.percentageInsertionByPasswork$ =
      this.statsService.getPercentageInsertionByPasswork('');
  }

  donwloadReport() {
    this.changeDetector.detectChanges();
    let elementRefList = this.pieChartOneList
      ?.toArray()
      .concat(...this.pieChartTwoList?.toArray());

    this.chartsList = this.chartsList.map((chart, index) => {
      chart.elementRef = elementRefList[index];
      return chart;
    });

    this.printService.generateGlobalReport(this.chartsList);
  }

  getNumberOfCompaniesValue() {
    this.numberOfCompanies$
      .pipe(
        first(),
        tap((data: any) => {
          this.chartsList.push({
            id: 15,
            title: "Nombre d'entreprises rencontrées",
            value: data?.result,
            extraText : '',
            type: 3,
            description : 'Ce sont des entreprises identifiées en présentiel par les TIP, sensibilisées et informées par rapport aux services et aux activités des GIP.'
          });
        })
      )
      .subscribe();
  }

  getNumberOfPassworksValue() {
    this.numberOfPassworks$
      .pipe(
        first(),
        tap((data: any) => {
          this.chartsList.push({
            id: 16,
            title: 'Nombre de formations professionnelles réalisées',
            value: data?.result,
            extraText : '',
            type: 3,
            description : 'L\'ensemble des formations professionnelles planifiées et exécutées par les GIP au profit des jeunes NEET. Elles sont réalisées sur une durée minimale de 3 mois (théorie et pratique), en partenariat formelle avec au moins une entreprise.'
          });
        })
      )
      .subscribe();
  }

  getPercentageInsertionByTotalYouthValue() {
    this.percentageInsertionByTotalYouth$
      .pipe(
        first(),
        tap((data: any) => {
          this.chartsList.push({
            id: 17,
            title:
              'Pourcentage des insertions par rapport aux jeunes accueillis',
            value: data?.result?.toFixed(0),
            extraText : '%',
            type: 3,
          });
        })
      )
      .subscribe();
  }

  getPercentageInsertionByCapacityBuildingValue() {
    this.percentageInsertionByCapacityBuilding$
      .pipe(
        first(),
        tap((data: any) => {
          this.chartsList.push({
            id: 18,
            title:
              'Pourcentage des insertions par rapport aux jeunes bénéficiaires des ateliers RC',
            value: data?.result?.toFixed(0),
            extraText : '%',
            type: 3,
          });
        })
      )
      .subscribe();
  }

  getPercentageInsertionByPassworkValue() {
    this.percentageInsertionByPasswork$
      .pipe(
        first(),
        tap((data: any) => {
          this.chartsList.push({
            id: 19,
            title:
              'Pourcentage des insertions par rapport aux jeunes bénéficiaires des formations PW',
            value: data?.result?.toFixed(0),
            extraText : '%',
            type: 3,
          });
        })
      )
      .subscribe();
  }
}

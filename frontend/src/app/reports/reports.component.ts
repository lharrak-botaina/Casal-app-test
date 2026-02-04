import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationResult } from '../core/models/association';
import { AssociationService } from '../core/services/association.service';
import { StatsService } from '../core/services/stats.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  associations$ : Observable<AssociationResult>
  associationId : string;

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
  percentageInsertionByTotalYouth$
  percentageInsertionByCapacityBuilding$
  percentageInsertionByPasswork$

  constructor(private statsService: StatsService, private associationService : AssociationService) {}

  ngOnInit() {
    this.associations$ = this.associationService.find(0, 1000, '');
  }

  loadStats(idPanel, refreshStats = false) {
    if(!refreshStats) this.associationId = ''
    //BAD IMPLEMENTATION; MUST TO BE CHANGED
    switch (idPanel) {
      case 1:
        if (!this.numberOfYoungAddedStats$ || refreshStats)
          this.numberOfYoungAddedStats$ =
            this.statsService.getNumberOfYoungAddedStats(this.associationId);
        break;
      case 2:
        if (!this.numberOfYouthHaveMoreThanThreeCapacityBuildingStats$ || refreshStats)
          this.numberOfYouthHaveMoreThanThreeCapacityBuildingStats$ =
            this.statsService.getNumberOfYouthHaveMoreThreeFourCapacityBuildingStats(this.associationId);
        break;
      case 3:
        if (!this.numberOfYouthHavePassworkTrainingStats$ || refreshStats)
          this.numberOfYouthHavePassworkTrainingStats$ =
            this.statsService.getNumberOfYouthHavePassworkTrainingStats(this.associationId);
        break;
      case 4:
        if (!this.numberOfFormalInsertionStats$ || refreshStats)
          this.numberOfFormalInsertionStats$ =
            this.statsService.getNumberOfFormalInsertionStats(this.associationId);
        break;
      case 5:
        if (!this.numberOfInformalInsertionStats$ || refreshStats)
          this.numberOfInformalInsertionStats$ =
            this.statsService.getNumberOfInformalInsertionStats(this.associationId);
        break;
      case 6:
        if (!this.numberOfInsertionsByActivityAreaStats$ || refreshStats)
          this.numberOfInsertionsByActivityAreaStats$ =
            this.statsService.getNumberOfInsertionsByActivityAreaStats(this.associationId);
        break;
      case 7:
        if (!this.numberOfInsertionsByContractTypeStats$ || refreshStats)
          this.numberOfInsertionsByContractTypeStats$ =
            this.statsService.getNumberOfInsertionsByContractTypeStats(this.associationId);
        break;
      case 8:
        if (!this.numberOfInsertionsByContractDurationStats$ || refreshStats)
          this.numberOfInsertionsByContractDurationStats$ =
            this.statsService.getNumberOfInsertionsByContractDurationStats(this.associationId);
        break;
      case 9:
        if (!this.numberOfInsertionsBySalaryStats$ || refreshStats)
          this.numberOfInsertionsBySalaryStats$ =
            this.statsService.getNumberOfInsertionsBySalaryStats(this.associationId);
        break;
      case 10:
        if (!this.numberOfCompanies$ || refreshStats)
          this.numberOfCompanies$ =
            this.statsService.getNumberOfCompaniesStats(this.associationId);
        break;
      case 11:
        if (!this.numberOfInvolvedCompaniesStats$ || refreshStats)
          this.numberOfInvolvedCompaniesStats$ =
            this.statsService.getNumberOfInvolvedCompaniesStats(this.associationId);
        break;
      case 12:
        if (!this.numberOfPassworks$ || refreshStats)
          this.numberOfPassworks$ =
            this.statsService.getNumberOfPassworksStats(this.associationId);
        break;
      case 13:
        if (!this.numberOfInsertionByCDIContract$ || refreshStats)
          this.numberOfInsertionByCDIContract$ =
            this.statsService.getNumberOfInsertionByContractStats("CDI", this.associationId);
        break;
      case 14:
        if (!this.numberOfInsertionByCDDContract$ || refreshStats)
          this.numberOfInsertionByCDDContract$ =
            this.statsService.getNumberOfInsertionByContractStats("CDD", this.associationId);
        break;
      case 15:
        if (!this.numberOfInsertionByCTTContract$ || refreshStats)
          this.numberOfInsertionByCTTContract$ =
            this.statsService.getNumberOfInsertionByContractStats("CTT", this.associationId);
        break;
      case 16:
        if (!this.numberOfInsertionByAnapecContract$ || refreshStats)
          this.numberOfInsertionByAnapecContract$ =
            this.statsService.getNumberOfInsertionByContractStats("Anapec", this.associationId);
        break;
      case 17:
        if (!this.percentageInsertionByTotalYouth$ || refreshStats)
          this.percentageInsertionByTotalYouth$ =
            this.statsService.getPercentageInsertionByTotalYouth(this.associationId);
        break;
      case 18:
        if (!this.percentageInsertionByCapacityBuilding$ || refreshStats)
          this.percentageInsertionByCapacityBuilding$ =
            this.statsService.getPercentageInsertionByCapacityBuilding(this.associationId);
        break;
      case 19:
        if (!this.percentageInsertionByPasswork$ || refreshStats)
          this.percentageInsertionByPasswork$ =
            this.statsService.getPercentageInsertionByPasswork(this.associationId);
        break;

      default:
        break;
    }
  }

  onChangeAssociation(event){
    console.log(event)
    this.associationId = event?.associationId;

    this.loadStats(event?.panelId, true);
  }
}

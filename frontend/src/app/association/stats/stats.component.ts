import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/core/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
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

  constructor(private statsService: StatsService) {}

  ngOnInit() {  }

  loadStats(idPanel) {
    //BAD IMPLEMENTATION; MUST TO BE CHANGED
    switch (idPanel) {
      case 1:
        if (!this.numberOfYoungAddedStats$)
          this.numberOfYoungAddedStats$ =
            this.statsService.getAssociationNumberOfYoungAddedStats();
        break;
      case 2:
        if (!this.numberOfYouthHaveMoreThanThreeCapacityBuildingStats$)
          this.numberOfYouthHaveMoreThanThreeCapacityBuildingStats$ =
            this.statsService.getAssociationNumberOfYouthHaveMoreThreeFourCapacityBuildingStats();
        break;
      case 3:
        if (!this.numberOfYouthHavePassworkTrainingStats$)
          this.numberOfYouthHavePassworkTrainingStats$ =
            this.statsService.getAssociationNumberOfYouthHavePassworkTrainingStats();
        break;
      case 4:
        if (!this.numberOfFormalInsertionStats$)
          this.numberOfFormalInsertionStats$ =
            this.statsService.getAssociationNumberOfFormalInsertionStats();
        break;
      case 5:
        if (!this.numberOfInformalInsertionStats$)
          this.numberOfInformalInsertionStats$ =
            this.statsService.getAssociationNumberOfInformalInsertionStats();
        break;
      case 6:
        if (!this.numberOfInsertionsByActivityAreaStats$)
          this.numberOfInsertionsByActivityAreaStats$ =
            this.statsService.getAssociationNumberOfInsertionsByActivityAreaStats();
        break;
      case 7:
        if (!this.numberOfPassworks$)
          this.numberOfPassworks$ =
            this.statsService.getAssociationNumberOfPassworksStats();
        break;
    
      default:
        break;
    }
  }
}

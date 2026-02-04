import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { DefaultStat, StatsData } from 'src/app/core/models/charts_data';
import { StatsService } from 'src/app/core/services/stats.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  numberOfYoungAddedStats$;
  numberOfInsertionStats$
  topThreeAssociationsStats$
  numberOfInvolvedCompaniesStats$
  numberOfPassworks$;
  numberOfYouthHavePassworkTrainingStats$ : BehaviorSubject<DefaultStat[]> = new BehaviorSubject([]);
  TotalYoungAdded : BehaviorSubject<DefaultStat[]> = new BehaviorSubject([]);
  colorScheme = {
    domain: ['#5AA454', '#F8AC00', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  cardColor: string = '#232837';

  constructor(private statsService : StatsService) {}

  ngOnInit() {
    this.getNumberOfYoungAddedStats();
    this.getNumberOfYouthHavePassworkTrainingStats();
    this.getNumberOfInsertion();
    this.getTopThreeAssociationByInsertion();
    this.getNumberOfInvolvedCompaniesStats();
    this.getNumberOfPassworksStats();
  }

  getNumberOfYoungAddedStats(){
    this.numberOfYoungAddedStats$ = this.statsService.getNumberOfYoungAddedStats()
    .pipe(
      tap((result : StatsData) => {
        const totalYoung = result.nbrByGenre.reduce((s, a) => s + +a.value, 0).toString();
        this.TotalYoungAdded.next([{name : 'Total', value : totalYoung}])
      })      
    )
  }

  getNumberOfYouthHavePassworkTrainingStats(){
    this.statsService.getNumberOfYouthHavePassworkTrainingStats()
    .pipe(
      first(),
      tap((result : StatsData) =>  {
        const totalYoung = result.nbrByGenre.reduce((s, a) => s + +a.value, 0).toString();
        this.numberOfYouthHavePassworkTrainingStats$.next([{name : 'Total', value : totalYoung}])      })
    )
    .subscribe();
  }
 
  getNumberOfPassworksStats(){
    this.numberOfPassworks$ = this.statsService.getNumberOfPassworksStats('')
                                  .pipe(
                                    map((data : any) => {return [{value :  data?.result, name : "Total"}]})
                                  );
  }

  getNumberOfInvolvedCompaniesStats(){
    this.numberOfInvolvedCompaniesStats$ = this.statsService.getNumberOfInvolvedCompaniesStats('');
  }

  getNumberOfInsertion(){
    this.numberOfInsertionStats$ = this.statsService.getNumberOfInsertion();
  }

  getTopThreeAssociationByInsertion(){
    this.topThreeAssociationsStats$ = this.statsService.getTopThreeAssociationByInsertion();
  }
}

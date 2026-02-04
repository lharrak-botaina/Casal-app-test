import { DefaultStat } from './../models/charts_data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { StatsData } from '../models/charts_data';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http : HttpClient) { }

  getNumberOfYoungAddedStats(associationId? : string): Observable<StatsData> {
    let params;

    if(associationId)
     params = {associationId};

    return this.http.get<StatsData>('stats/1', {params}).pipe(shareReplay());
  }

  getAssociationNumberOfYoungAddedStats(): Observable<StatsData> {
    return this.http.get<StatsData>('stats/association/1',).pipe(shareReplay());
  }

  getNumberOfYouthHaveMoreThreeFourCapacityBuildingStats(associationId : string): Observable<StatsData> {
    let params;

    if(associationId)
     params = {associationId};

    return this.http.get<StatsData>('stats/2', {params}).pipe(shareReplay());
  }

  getAssociationNumberOfYouthHaveMoreThreeFourCapacityBuildingStats(): Observable<StatsData> {
    return this.http.get<StatsData>('stats/association/2').pipe(shareReplay());
  }

  getNumberOfYouthHavePassworkTrainingStats(associationId? : string): Observable<StatsData> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<StatsData>('stats/3', {params}).pipe(shareReplay());
  }

  getAssociationNumberOfYouthHavePassworkTrainingStats(): Observable<StatsData> {
    return this.http.get<StatsData>('stats/association/3').pipe(shareReplay());
  }

  getNumberOfFormalInsertionStats(associationId : string): Observable<StatsData> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<StatsData>('stats/4', {params}).pipe(shareReplay());
  }

  getAssociationNumberOfFormalInsertionStats(): Observable<StatsData> {
    return this.http.get<StatsData>('stats/association/4').pipe(shareReplay());
  }

  getNumberOfInformalInsertionStats(associationId : string): Observable<StatsData> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<StatsData>('stats/5', {params}).pipe(shareReplay());
  }

  getAssociationNumberOfInformalInsertionStats(): Observable<StatsData> {
    return this.http.get<StatsData>('stats/association/5').pipe(shareReplay());
  }

  getNumberOfInsertionsByActivityAreaStats(associationId : string): Observable<DefaultStat> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<DefaultStat>('stats/6', {params}).pipe(shareReplay());
  }

  getAssociationNumberOfInsertionsByActivityAreaStats(): Observable<DefaultStat> {
    return this.http.get<DefaultStat>('stats/association/6').pipe(shareReplay());
  }

  getNumberOfInsertionsByContractTypeStats(associationId : string): Observable<DefaultStat> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<DefaultStat>('stats/7', {params}).pipe(shareReplay());
  }

  getNumberOfInsertionsByContractDurationStats(associationId : string): Observable<DefaultStat> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<DefaultStat>('stats/8', {params}).pipe(shareReplay());
  }

  getNumberOfInsertionsBySalaryStats(associationId : string): Observable<DefaultStat> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<DefaultStat>('stats/9', {params}).pipe(shareReplay());
  }

  getNumberOfCompaniesStats(associationId : string): Observable<number> {
    return this.http.get<number>('stats/10').pipe(shareReplay());
  }

  getNumberOfInvolvedCompaniesStats(associationId : string): Observable<DefaultStat> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<DefaultStat>('stats/11', {params}).pipe(shareReplay());
  }

  getNumberOfPassworksStats(associationId : string): Observable<any> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<any>('stats/12', {params}).pipe(shareReplay());
  }

  getAssociationNumberOfPassworksStats(): Observable<any> {
    return this.http.get<any>('stats/association/12').pipe(shareReplay());
  }

  getNumberOfInsertionByContractStats(contract, associationId : string): Observable<any> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<any>('stats/13?contract='+contract, {params}).pipe(shareReplay());
  }

  getPercentageInsertionByTotalYouth(associationId : string): Observable<any> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<any>('stats/14', {params}).pipe(shareReplay());
  }
  
  getPercentageInsertionByCapacityBuilding(associationId : string): Observable<any> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<any>('stats/15', {params}).pipe(shareReplay());
  }

  getPercentageInsertionByPasswork(associationId : string): Observable<any> {
    let params;

    if(associationId)
     params = {associationId};
    return this.http.get<any>('stats/16', {params}).pipe(shareReplay());
  }

  getNumberOfInsertion(): Observable<any> {
    return this.http.get<any>('stats/17').pipe(shareReplay());
  }

  getTopThreeAssociationByInsertion(): Observable<any> {
    return this.http.get<any>('stats/18').pipe(shareReplay());
  }
}

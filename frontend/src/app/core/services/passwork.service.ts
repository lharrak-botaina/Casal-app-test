import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Passwork, PassworkResult } from '../models/passwork';

@Injectable({
  providedIn: 'root'
})
export class PassworkService {

  constructor(private http : HttpClient) { }

  add(payload) {
    return this.http.post('passworks', payload);
  }

  find(pageNumber = 0, pageSize = 10, filterQuery): Observable<PassworkResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<PassworkResult>('passworks', { params }).pipe(shareReplay());
  }

  findAssociationPassworks(): Observable<Passwork> {
    return this.http.get<Passwork>('passworks/list').pipe(shareReplay());
  }

  findOne(id): Observable<Passwork> {
    return this.http.get<Passwork>(`passworks/${id}`).pipe(shareReplay());
  }

  edit(id, payload) {
    return this.http.put(`passworks/${id}`, payload);
  }

  editTrainingModules(id, payload) {
    return this.http.put(`passworks/${id}/modules`, payload);
  }

  editTrainingPlanning(id, payload) {
    return this.http.put(`passworks/${id}/planning`, payload);
  }

  archive(id, payload) {
    return this.http.put(`passworks/${id}/archive`, payload);
  }


}

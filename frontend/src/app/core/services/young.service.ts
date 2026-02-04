import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Young, YoungResult } from '../models/young';

@Injectable({
  providedIn: 'root'
})
export class YoungService {

  constructor(private http : HttpClient) { }

  add(payload) {
    return this.http.post('young', payload);
  }

  find(pageNumber = 0, pageSize = 10, filterQuery): Observable<YoungResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<YoungResult>('young', { params }).pipe(shareReplay());
  }

  findByAdmin(pageNumber = 0, pageSize = 10, filterQuery): Observable<YoungResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<YoungResult>('young/admin', { params }).pipe(shareReplay());
  }

  findByCompany(pageNumber = 0, pageSize = 10, filterQuery): Observable<YoungResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<YoungResult>('young/company', { params }).pipe(shareReplay());
  }

  findOne(id): Observable<Young> {
    return this.http.get<Young>(`young/${id}`).pipe(shareReplay());
  }

  findOneByCompany(id): Observable<Young> {
    return this.http.get<Young>(`young/${id}/details`).pipe(shareReplay());
  }

  edit(id, payload) {
    return this.http.put(`young/${id}`, payload);
  }

  editPhoto(id, payload) {
    return this.http.put(`young/${id}/photo`, payload);
  }

  editJustification(id, payload) {
    return this.http.put(`young/${id}/justification`, payload);
  }

  addInsertion(id, payload) {
    return this.http.put(`young/${id}/insertion`, payload);
  }

  remove(id) {
    return this.http.delete(`young/${id}`);
  }


}

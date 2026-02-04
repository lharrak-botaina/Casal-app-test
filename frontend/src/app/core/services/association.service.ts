import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Association, AssociationResult } from '../models/association';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssociationService {
  constructor(private http: HttpClient) {}

  add(payload) {
    return this.http.post('associations', payload);
  }

  find(pageNumber = 0, pageSize = 14, filterQuery): Observable<AssociationResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<AssociationResult>('associations', { params }).pipe(shareReplay());
  }

  findLight(): Observable<Association[]> {
    return this.http.get<Association[]>('associations/company').pipe(shareReplay());
  }

  findOne(id): Observable<Association> {
    return this.http.get<Association>(`associations/${id}`).pipe(shareReplay());
  }

  edit(id, payload) {
    return this.http.put(`associations/${id}`, payload);
  }

  editPassword(id, payload) {
    return this.http.put(`associations/${id}/password`, payload);
  }

  editPhoto(id, payload) {
    return this.http.put(`associations/${id}/upload_photo`, payload);
  }

  remove(id) {
    return this.http.delete(`associations/${id}`);
  }
}

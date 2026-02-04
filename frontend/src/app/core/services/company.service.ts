import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Company, CompanyResult } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  add(payload) {
    return this.http.post('companies', payload);
  }

  find(pageNumber = 0, pageSize = 10, filterQuery): Observable<CompanyResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<CompanyResult>('companies', { params }).pipe(shareReplay());
  }

  findOne(id): Observable<Company> {
    return this.http.get<Company>(`companies/${id}`).pipe(shareReplay());
  }

  findCompanyByUser(): Observable<Company> {
    return this.http.get<Company>(`companies/user`).pipe(shareReplay());
  }

  edit(id, payload) {
    return this.http.put(`companies/${id}`, payload);
  }

  editPassword(id, payload) {
    return this.http.put(`companies/${id}/password`, payload);
  }

  editLogo(id, payload) {
    return this.http.put(`companies/${id}/upload_photo`, payload);
  }

  setColaboration(payload) {
    return this.http.put(`companies/colaboration`, payload);
  }

  remove(id) {
    return this.http.delete(`companies/${id}`);
  }
}

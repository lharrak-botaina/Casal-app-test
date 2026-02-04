import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Job, JobResult } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  add(payload) {
    return this.http.post('jobs', payload);
  }

  addByCompany(payload) {
    return this.http.post('jobs/company', payload);
  }

  find(pageNumber = 0, pageSize = 10, filterQuery): Observable<JobResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<JobResult>('jobs', { params }).pipe(shareReplay());
  }

  findByCompany(pageNumber = 0, pageSize = 10, filterQuery): Observable<JobResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<JobResult>('jobs/company', { params }).pipe(shareReplay());
  }

  findByAssociation(pageNumber = 0, pageSize = 10, filterQuery): Observable<JobResult> {
    let params = {...filterQuery, pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<JobResult>('jobs/association', { params }).pipe(shareReplay());
  }

  findOne(id): Observable<Job> {
    return this.http.get<Job>(`jobs/${id}`).pipe(shareReplay());
  }

  findOneByCompany(id): Observable<Job> {
    return this.http.get<Job>(`jobs/company/${id}`).pipe(shareReplay());
  }

  findOneByAssociation(id): Observable<Job> {
    return this.http.get<Job>(`jobs/association/${id}`).pipe(shareReplay());
  }

  findAssociationJobs(): Observable<Job> {
    return this.http.get<Job>('jobs/list').pipe(shareReplay());
  }

  edit(id, payload) {
    return this.http.put(`jobs/${id}`, payload);
  }

  editCompanyJob(id, payload) {
    return this.http.put(`jobs/company/${id}`, payload);
  }

  addByAssociation(payload) {
    return this.http.post('jobs/association', payload);
  }

  editByAssociation(id, payload) {
    return this.http.put(`jobs/association/${id}`, payload);
  }

  archive(id, payload) {
    return this.http.put(`jobs/${id}/archive`, payload);
  }

  archiveCompanyJob(id, payload) {
    return this.http.put(`jobs/company/${id}/archive`, payload);
  }

  archiveByAssociation(id, payload) {
    return this.http.put(`jobs/association/${id}/archive`, payload);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { DocumentResult } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http : HttpClient) { }

  add(payload) {
    return this.http.post('documents', payload);
  }

  find(pageNumber = 0, pageSize = 10): Observable<DocumentResult> {
    let params = {pageNumber : pageNumber.toString(), pageSize : pageSize.toString()};

    return this.http.get<DocumentResult>('documents', { params }).pipe(shareReplay());
  }
}

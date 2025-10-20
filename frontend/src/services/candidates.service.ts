
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '@shared/models/candidate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'https://localhost:3000/candidate';

  private http = inject(HttpClient);

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  };
}

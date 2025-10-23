
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '@shared/models/candidate';
import { Observable } from 'rxjs';

// this is not actually needed, but I've left it to show how a service would look like.
// In a normal project I'd remove to avoid cluttering.

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

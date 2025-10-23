
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '@shared/models/candidate';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'https://localhost:3000/candidate';

  private http = inject(HttpClient);

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  };

  parseCandidate(formData: FormData): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, formData).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
}

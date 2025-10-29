
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '@shared/models/candidate';
import { Observable, catchError, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CandidateApiService {
  // TODO: This hardcoded URL would be in the envs in a real project
  private apiUrl = 'http://localhost:3000/candidate';

  private http = inject(HttpClient);

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  };

  parseCandidate(uploadForm: FormGroup): Observable<Candidate> {
    const formData = new FormData();
    formData.append('name', uploadForm.get('name')?.value);
    formData.append('surname', uploadForm.get('surname')?.value);
    formData.append('file', uploadForm.get('file')?.value);

    return this.http.post<Candidate>(this.apiUrl, formData).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
}

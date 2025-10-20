
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Candidate } from '@shared/models/candidate';
import * as CandidateActions from '../store/candidates/candidates.actions';
import { CandidateState } from '../store/candidates/candidates.reducer';
import { CandidateUploadComponent } from './candidateUpload.component';

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CandidateUploadComponent
  ],
  templateUrl: './candidateCard.component.html',
  styleUrl: './candidateCard.scss'
})
export class CandidateCardComponent {
  private store = inject<Store<{ candidateState: CandidateState }>>(Store);
  private builtForm = inject(FormBuilder);
  private http = inject(HttpClient);

  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor() {
    this.uploadForm = this.builtForm.group({
      name: [''],
      surname: [''],
    });
  }

  handleNameChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.uploadForm.get('name')?.setValue(element?.value || null);
  }

  handleSurnameChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.uploadForm.get('surname')?.setValue(element?.value || null);
  }

  handleFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.selectedFile = element?.files?.[0] || null;
  }

  handleResponse(res: Object): void {
    const candidate = res as Candidate;
    console.log('Response:', candidate, this.store);
    this.store.dispatch(CandidateActions.parseCandidatesSuccess({ candidate }));
  }

  onClick() {
    const formData = new FormData();
    formData.append('name', this.uploadForm.get('name')?.value);
    formData.append('surname', this.uploadForm.get('surname')?.value);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http.post('http://localhost:3000/candidate', formData).subscribe({
      next: this.handleResponse.bind(this),
      error: (err) => console.error('Error:', err),
    });
  }
}

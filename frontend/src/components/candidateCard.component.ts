
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate } from '@shared/models/candidate';
import * as CandidateActions from '../store/candidates/candidates.actions';
import { CandidateState } from '../store/candidates/candidates.reducer';
import { CandidateUploadComponent } from './candidateUpload.component';

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [
    CandidateUploadComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './candidateCard.component.html',
  styleUrl: './candidateCard.scss'
})
export class CandidateCardComponent {
  private store = inject<Store<{ candidateState: CandidateState }>>(Store);
  private builtForm = inject(FormBuilder);
  private http = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);
  isProcessing = signal(false);
  shakeButton = signal(false);
  resetFields = signal(false);

  uploadForm: FormGroup;

  constructor() {
    this.uploadForm = this.builtForm.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
    const selectedFile = element?.files?.[0] || null;
    this.uploadForm.get('file')?.setValue(selectedFile);
  }

  handleResponse(res: object): void {
    const candidate = res as Candidate;
    this.store.dispatch(CandidateActions.parseCandidatesSuccess({ candidate }));
    this.uploadForm.reset();
    this.resetFields.set(true);
    this.isProcessing.set(false);
    setTimeout(() => this.resetFields.set(false), 0);
  }

  handleErrorResponse(err: Error): void {
    this.openSnackBar(`Woopsies!!! ${err.message}`, 'Close');
    this.isProcessing.set(false);
  }

  onClick() {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched(); // Show validation errors
      this.openSnackBar('Please fill out all required fields correctly.', 'Close');

      this.shakeButton.set(true);
      setTimeout(() => this.shakeButton.set(false), 400); // Reset after animation

      return;
    }

    const formData = new FormData();
    formData.append('name', this.uploadForm.get('name')?.value);
    formData.append('surname', this.uploadForm.get('surname')?.value);
    formData.append('file', this.uploadForm.get('file')?.value);

    this.isProcessing.set(true);
    this.http.post('http://localhost:3000/candidate', formData).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleErrorResponse.bind(this),
    });
  }
}


import { Store } from '@ngrx/store';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateService } from 'src/services/candidates.service';
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
  private _snackBar = inject(MatSnackBar);
  private candidateService = inject(CandidateService);

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

  onClick() {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched(); // Show validation errors
      this.openSnackBar('Please fill out all required fields correctly.', 'Close');
      this.shakeButton.set(true);
      setTimeout(() => this.shakeButton.set(false), 400); // Reset after animation
      return;
    }
    this.isProcessing.set(true);

    this.candidateService.parseCandidate(this.uploadForm).subscribe({
      next: (candidate: Candidate): void => {
        this.store.dispatch(CandidateActions.parseCandidatesSuccess({ candidate }));
        this.uploadForm.reset();
        this.resetFields.set(true);
        this.isProcessing.set(false);
        setTimeout(() => this.resetFields.set(false), 0);
      },
      error: (err: Error): void => {
        this.openSnackBar(`Woopsies!!! ${err.message}`, 'Close');
        this.isProcessing.set(false);
      },
    });
  }
}

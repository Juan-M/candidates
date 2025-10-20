
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CandidateUploadComponent } from './candidateUpload.component'; // Adjust path as needed

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CandidateUploadComponent
  ],
  templateUrl: './candidateCard.component.html',
})
export class CandidateCardComponent {}

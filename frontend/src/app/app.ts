import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CandidateCardComponent } from '../components/candidateUpload/candidateCard.component';
import { CandidateListComponent } from '../components/candidateList/candidateList.component';
import { CandidatesImportComponent } from '../components/candidatesImport/candidatesImport.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CandidateCardComponent,
    CandidateListComponent,
    CandidatesImportComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('frontend');
}

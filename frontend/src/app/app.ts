import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CandidateCardComponent } from '../components/candidateCard.component';
import { CandidateListComponent } from '../components/candidateList.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CandidateCardComponent,
    CandidateListComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}

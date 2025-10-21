
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Candidate } from '@shared/models/candidate';
import * as CandidateActions from '../store/candidates/candidates.actions';
import { CandidateState } from '../store/candidates/candidates.reducer';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [ MatListModule, MatDividerModule, AsyncPipe, MatIconModule ],
  styleUrl: './candidateList.scss',
  templateUrl: './candidateList.component.html',
})
export class CandidateListComponent {
  private store = inject<Store<{ candidateState: CandidateState }>>(Store);

  candidates$: Observable<Candidate[]> = this.store.select(
    state => state.candidateState.candidates
  );

  delete(candidate: Candidate) {
    this.store.dispatch(CandidateActions.deleteCandidate(candidate));
  }
}


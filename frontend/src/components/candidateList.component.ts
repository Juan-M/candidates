
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Candidate } from '@shared/models/candidate';
import * as CandidateActions from '../store/candidates.actions';
import { CandidateState } from '../store/candidates.reducer';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  standalone: true
})
export class CandidateListComponent implements OnInit {
  private store = inject<Store<{ candidateState: CandidateState }>>(Store);

  candidates$: Observable<Candidate[]> = this.store.select(
    state => state.candidateState.candidates
  );

  ngOnInit(): void {
    this.store.dispatch(CandidateActions.loadCandidates());
  }
}


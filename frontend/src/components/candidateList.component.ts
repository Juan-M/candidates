
import { Observable } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Candidate } from '@shared/models/candidate';
import * as CandidateActions from '../store/candidates/candidates.actions';
import { CandidateState } from '../store/candidates/candidates.reducer';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [ MatListModule, MatDividerModule ],
  templateUrl: './candidateList.component.html',
})
export class CandidateListComponent implements OnInit {
  private store = inject<Store<{ candidateState: CandidateState }>>(Store);

  candidates$: Observable<Candidate[]> = this.store.select(
    state => state.candidateState.candidates
  );

  ngOnInit(): void {
    console.log('!!!!---->>>>>', this.store);
    // this.store.dispatch(CandidateActions.loadCandidates());
  }
}


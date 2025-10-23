
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CandidateService } from '../../services/candidates.service';
import * as CandidateActions from './candidates.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

// this is not actually used at the end since the backend doesn't hold information of the candidates
// but I kept it as a token of how it would work if it would be needed.
// In a normal project I'd clean it up right away to avoid cluttering.

@Injectable()
export class CandidateEffects {

  private actions$ = inject(Actions);
  private candidateService = inject(CandidateService);

  loadCandidates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CandidateActions.loadCandidates),
      mergeMap(() =>
        this.candidateService.getCandidates().pipe(
          map(candidates => CandidateActions.loadCandidatesSuccess({ candidates })),
          catchError(error => of(CandidateActions.loadCandidatesFailure({ error })))
        )
      )
    )
  );
}

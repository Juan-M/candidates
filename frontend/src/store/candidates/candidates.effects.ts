
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CandidateService } from '../services/candidates.service';
import * as CandidateActions from './candidates.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

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

import { createAction, props } from '@ngrx/store';
import { Candidate } from '@shared/models/candidate';

export const loadCandidates = createAction('[Candidate] Load Candidates');
export const loadCandidatesSuccess = createAction(
  '[Candidate] Load Candidates Success',
  props<{ candidates: Candidate[] }>()
);
export const loadCandidatesFailure = createAction(
  '[Candidate] Load Candidates Failure',
  props<{ error: Error }>()
);
export const loadCandidatesFromFile = createAction(
  '[Candidate] Load Candidates from disk import',
  props<{ candidates: Candidate[] }>()
);
export const parseCandidatesSuccess = createAction(
  '[Candidate] Parse Candidate Success',
  props<{ candidate: Candidate }>()
);
export const deleteCandidate = createAction(
  '[Candidate] Delete Candidate',
  props<{ id: string }>()
);


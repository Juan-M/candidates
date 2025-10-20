
import { createReducer, on } from '@ngrx/store';
import { Candidate } from '@shared/models/candidate';
import * as CandidateActions from './candidates.actions';

export interface CandidateState {
  candidates: Candidate[];
  error: Error | null;
}

export const initialState: CandidateState = {
  candidates: [],
  error: null
};

export const candidateReducer = createReducer(
  initialState,
  on(CandidateActions.loadCandidatesSuccess, (state, { candidates }) => ({
    ...state,
    candidates
  })),
  on(CandidateActions.loadCandidatesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

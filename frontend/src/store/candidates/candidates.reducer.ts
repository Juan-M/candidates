
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
  on(CandidateActions.parseCandidatesSuccess, (state, { candidate }) => ({
    ...state,
    candidates: [ ...state.candidates, candidate ]
  })),
  on(CandidateActions.deleteCandidate, (state, { id }) => ({
    ...state,
    candidates: state.candidates.filter( c => c.id !== id)
  })),
  on(CandidateActions.loadCandidatesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

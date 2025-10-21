
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CandidateActions from '../store/candidates/candidates.actions';
import { CandidateState } from '../store/candidates/candidates.reducer';

@Component({
  selector: 'app-candidates-import',
  standalone: true,
  imports: [ MatIconModule ],
  styleUrl: './candidatesImport.scss',
  templateUrl: './candidatesImport.component.html',
})
export class CandidatesImportComponent {
  private store = inject<Store<{ candidateState: CandidateState }>>(Store);
  private _snackBar = inject(MatSnackBar);
  candidateStateSignal = this.store.selectSignal(state => state.candidateState);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  import(e: Event) {
    const element = e.currentTarget as HTMLInputElement;
    const file = element.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedStore = JSON.parse(reader.result as string);
        // Dispatch action to store candidates
        this.store.dispatch(CandidateActions.loadCandidatesFromFile({ candidates: importedStore.candidates }));
        element.files = new DataTransfer().files;
      } catch (err) {
        this.openSnackBar(`Invalid JSON file format.: ${(err as Error).message}`, 'Close');
      }
    };
    reader.readAsText(file);
  }

  export() {
    const json = JSON.stringify(this.candidateStateSignal(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidate-store.json';
    a.click();

    URL.revokeObjectURL(url);
  }
}



import { Component, Input, Output, EventEmitter, computed, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-candidate-upload',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule],
  styleUrl: './candidateUpload.scss',
  templateUrl: './candidateUpload.component.html',
})
export class CandidateUploadComponent {
  @Input() uploadForm!: FormGroup;

  onNameChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.uploadForm.get('name')?.setValue(element?.value || null);
  }

  onSurnameChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.uploadForm.get('surname')?.setValue(element?.value || null);
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const selectedFile = element?.files?.[0] || null;
    this.uploadForm.get('file')?.setValue(selectedFile);
  }
}
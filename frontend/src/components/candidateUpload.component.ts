
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-candidate-upload',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule],
  styleUrl: './candidateUpload.scss',
  templateUrl: './candidateUpload.component.html',
})
export class CandidateUploadComponent {
  @Input() file: File | null = null;
  @Input() isValid: boolean | null = null;
  @Output() nameChanged = new EventEmitter<Event>();
  @Output() surnameChanged = new EventEmitter<Event>();
  @Output() fileChanged = new EventEmitter<Event>();

  onNameChange(event: Event): void {
    this.nameChanged.emit(event);
  }
  onSurnameChange(event: Event): void {
    this.surnameChanged.emit(event);
  }
  onFileChange(event: Event): void {
    this.fileChanged.emit(event);
  }

}


import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-candidate-upload',
  templateUrl: './candidateUpload.component.html',
})
export class CandidateUploadComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor() {
    this.uploadForm = this.fb.group({
      name: [''],
      surname: [''],
    });
  }

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.selectedFile = element?.files?.[0] || null;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.uploadForm.get('name')?.value);
    formData.append('number', this.uploadForm.get('number')?.value);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http.post('http://localhost:3000/candidate', formData).subscribe({
      next: (res) => console.log('Response:', res),
      error: (err) => console.error('Error:', err),
    });
  }
}

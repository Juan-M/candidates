
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-candidateUpload',
  templateUrl: './candidateUpload.component.html',
})
export class CandidateUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      name: [''],
      surname: [''],
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
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

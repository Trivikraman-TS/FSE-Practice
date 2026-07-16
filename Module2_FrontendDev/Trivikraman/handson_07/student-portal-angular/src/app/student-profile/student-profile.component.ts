import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: []
})
export class StudentProfileComponent implements OnInit {
  profileForm!: FormGroup;

  // Inject FormBuilder (Step 103)
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Setup reactive form group with explicit validations (Step 103)
    this.profileForm = this.fb.group({
      name: ['Trivikraman', [Validators.required]],
      email: ['trivikraman@example.edu', [Validators.required, Validators.email]],
      semester: [6, [Validators.required, Validators.min(1), Validators.max(8)]]
    });
  }

  // Helper methods to read control status easily in template
  get nameControl() {
    return this.profileForm.get('name');
  }

  get emailControl() {
    return this.profileForm.get('email');
  }

  get semesterControl() {
    return this.profileForm.get('semester');
  }

  // Handle Form Submission (Step 106)
  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Submitted Profile Form Value:', this.profileForm.value);
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      gameName: ['', Validators.required],
      tagLine: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const { gameName, tagLine } = this.searchForm.value;
      this.router.navigate(['/account', gameName, tagLine]);
    }
  }
} 
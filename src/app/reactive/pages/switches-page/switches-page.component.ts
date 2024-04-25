import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    genero: ['', Validators.required],
    notifications: ['', Validators.required],
    terms : [false, Validators.requiredTrue]
  });

  isNotValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched;
  }

  getFieldError(field: string) {
    if (!this.myForm.controls[field]) return '';
    const errors = this.myForm.controls[field].errors || {};
       
    for (const key of Object.keys(errors)) {
      console.log(key);
      switch (key) {
        case 'required': return 'Campo requerido';
        case 'minlength': return `Tamaño minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return '';
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }

}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  isNotValidField(field: string) :boolean | null{
    return this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched;
  }

  getFieldError(field: string) {
    if (!this.myForm.controls[field]) return '';
    const errors = this.myForm.controls[field].errors || {};
    
    for (const key of Object.keys(errors)) {
      console.log( 'mensaje error : ',key);
      switch (key) {
        case 'required': return 'Campo requerido';
        case 'minlength': return `Tamaño minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return '';
  }

  confirm() {
    console.log('frm:', this.myForm.value);
    //this.myForm.reset({ price: 10, inStorage: 1 })
  }

}

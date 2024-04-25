import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([])
  });

  public newFavoriteFame = new FormControl('', [Validators.required, Validators.minLength(3)]);


  get juegosFavoritos() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
  
  isNotValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched;
  }

  isNotValidFieldInArray(array: FormArray, index: number): boolean | null {
    return array.controls[index].errors &&
      array.controls[index].touched;
  }

  getFieldError(field: string) {
    if (!this.myForm.controls[field]) return '';
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': return 'Campo requerido';
        case 'minlength': return `Tamaño minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return '';
  }
  getArrayFieldError(field: string) {
    if (!this.myForm.controls[field]) return '';
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      console.log('mensaje error : ', key);
      switch (key) {
        case 'required': return 'Campo requerido';
        case 'minlength': return `Tamaño minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return '';
  }

  onDeleteFavoriteGame(index: number) {
    return this.juegosFavoritos.removeAt(index);
  }

  insertNewFavoriteGame() {
    if (this.newFavoriteFame.invalid) return;
    this.juegosFavoritos.push(this.fb.control(this.newFavoriteFame.value));
    this.newFavoriteFame.reset();
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}

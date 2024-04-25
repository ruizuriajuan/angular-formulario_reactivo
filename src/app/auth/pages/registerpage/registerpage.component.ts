import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator';

@Component({
  selector: 'app-registerpage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registerpage.component.html',
  styles: ``
})
export class RegisterpageComponent {
  private fb = inject(FormBuilder);
  private miValidacion = inject(ValidatorsService);
  private emailValidator = inject(EmailValidatorService);
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern( this.miValidacion.firstNameAndLastnamePattern )  ]],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    email: ['', [ Validators.required, Validators.pattern( this.miValidacion.emailPattern )], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.miValidacion.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.miValidacion.isFieldOneEqualFieldTwo('password','password2')
    ]
  });
  
  isNotValidField(field: string): boolean | null {
    return this.miValidacion.isNotValidField(this.myForm, field);
  }

  getFieldError(field: string) {
    return this.miValidacion.getFieldError(this.myForm, field);
  }

  onSubmit() {
    console.log(this.myForm.value)
    if (this.myForm.invalid) return;
  }

}

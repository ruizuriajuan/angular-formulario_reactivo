import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoutriesService } from '../../../services/country/coutries.service';
import { Country, Region } from '../../../interfaces/country.interface';
import { Observable, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements OnInit {

  private fb = inject(FormBuilder);
  private countryService = inject(CoutriesService);
  public paisesPorContinente: Country[] = [];
  public fronterasPorPais:string[] = [] ;

  public myForm: FormGroup = this.fb.group({
    continente: ['', Validators.required],
    pais: ['', Validators.required],
    fronteras: ['', Validators.required]
  })

  ngOnInit(): void {
    this.onContinenteChange();
    this.onPaisChange();
  }

  get regiones(): Region[] {
    return this.countryService.regions;
  }

  onContinenteChange() {
    this.myForm.get('continente')!.valueChanges
    .pipe(
      tap( ()=> this.myForm.get('pais')?.setValue('') ),
      tap( ()=> this.fronterasPorPais = [] ),
      switchMap( region => this.countryService.getPaisesPorContinente(region) ),
    )
    .subscribe( paises => this.paisesPorContinente = paises );
  }

  onPaisChange() {
    this.myForm.get('pais')!.valueChanges
    .pipe(
      filter( (codigoPais) => codigoPais.length > 0 ),
      tap( ()=> this.myForm.get('fronteras')?.setValue('') ),
      switchMap( (codigoPais) => this.countryService.getInfoPais(codigoPais) ),
      switchMap( (fronteras) => this.countryService.getFronteraPorPais(fronteras.borders??[]) ),
      tap( fronteras => console.log(fronteras) )
    )
    .subscribe( fronteras => this.fronterasPorPais = fronteras || []);
  }

}

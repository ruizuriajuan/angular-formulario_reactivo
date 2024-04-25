import { Injectable, inject } from '@angular/core';
import { Country, Region } from '../../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoutriesService {
  private _regions: Region[] = [Region.Africa, Region.America, Region.Asia, Region.Europe, Region.Oceania];
  private baseUrl: string = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  get regions(): Region[] {
    return [...this._regions];
  }

  getPaisesPorContinente(continente: Region): Observable<Country[]> {
    const url = `${this.baseUrl}/region/${continente}?fields=cca3,name`;
    //const url = `${this.baseUrl}/region/${continente}`
    return this.http.get<Country[]>(url);
  }

  getInfoPais(codigoPais: string): Observable<Country> {
    console.log([{codigoPais}]);
    const url = `${this.baseUrl}/alpha/${codigoPais}?fields=name,borders`;
    return this.http.get<Country>(url);
  }

  getFronteraPorPais(fronteras: string[]): Observable<string[]> {
    let resultado: string[] = [];
    fronteras.forEach (frontera => {
      this.getInfoPais(frontera)
      .subscribe(pais => {resultado.push(pais.name.common)} )
    })
    return of(resultado);
    
  }

}

import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

// Acá se va acrear un Validador Asincrono para el email

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {

  constructor() { }

  // Observable a parte de ser un tipo tambien puede ser usado para crear Observables porque es una clase.
  validate( control: AbstractControl ): Observable<ValidationErrors | null> {
    //throw new Error('Method not implemented.');
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log({ email });

      // Si este email esta tomado
      if ( email === 'wvelandia@gmail.com' ) {
        subscriber.next({ emailTaken: true });
        subscriber.complete(); // Esto me limpia el subscribe ya me deja de emitir
        // return;
      }

      // Si el email digitado no esta tomado
      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay( 3000 )
    );

    return httpCallObservable;

  }

  /* validate( control: AbstractControl ): Observable<ValidationErrors | null> {
    //throw new Error('Method not implemented.');
    const email = control.value;
    console.log({ email })

    // Como esto es asincrono Angular me pone el formulario en Pendiete mientras hace las validaiones, por ello se colocó el delay de 2 segundos para ver el mensaje.
    return of({
      emailTaken: true
    }).pipe(
      delay( 2000 )
    );

  } */

  // Este metodo es opcional.
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}

// Este ejemplo es una manera de hacer, visitar una Api donde se le envia el email para verificar si ya esta registrado
// return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
// .pipe(
//   // delay(3000),
//   map( resp => {
//     return ( resp.length === 0 )
//         ? null
//         : { emailTaken: true }
//   })
// );

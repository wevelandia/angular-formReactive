import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3) ] ],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  })

  // Creo un nuevo elemento para ustilizarlo en Adicionar elementos al FormArray
  public newFavorite: FormControl = new FormControl( '', Validators.required );

  constructor( private fb: FormBuilder ) {}

  // Definimos este get para obtener los controles de favoriteGames y faciliar la duplicidad de elementos que tenemos que hace en el HTML.
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // Otra manera de simplificar la visualización de los mensajes de Error.
  // Para ello creamos un metodo
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  // Acá se estara trabajando es con un FormArray y se debe de saber que elemento de ese arreglo esta fallando por ello se recibe el indice
  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  // Para saber que tipo de mensaje mostrar de acuerdo al error se debe de realizar otro metodo
  getFieldError( field: string ): string | null {
    if ( this.myForm.controls[field] && !this.myForm.controls[field].errors ) return null;

    // Tomemos el objeto de los errores a evaluar.
    /* Si this.myForm.controls[field].errors no devuelve nada entonces que me devuelva un vacio (|| {})
    ello para no colocar esta instrucción en el if anterior: this.myForm.controls[field].errors */
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      // console.log(key);
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo requiere mínimo ${ errors['minlength'].requiredLength } letras.`;
      }
    }

    return null;
  }

  // Creamos el metodo para adicionar elementos al FormArray
  onAaddToFavorites(): void {
    if ( this.newFavorite.invalid ) return;

    //console.log( this.newFavorite.value );
    const newGame = this.newFavorite.value;

    // Hay varias maneras de agregar ese elemento al FormArray

    // 1. Si no se esta trabajando con FormBuilder se inserta así:
    // this.favoriteGames.push( new FormControl( newGame, Validators.required ) );\

    // 2. Si manejo el FormBuilder sería:
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();

  }

  // Creamos el metodo ara eliminar un elemento de una formArray
  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    // Cuando se hace un POST deberiamos de reiniciar nuestro favoriteGames
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);

    this.myForm.reset();

  }

}

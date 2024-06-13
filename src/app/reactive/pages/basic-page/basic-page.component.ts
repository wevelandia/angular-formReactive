import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Este es un producto que asi me puede enviar un Backend
const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
}


@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent implements OnInit {

  // Angular tiene un validador incluido y es Validators.

  // Creamos el Formulario Reactivo
  /* public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  }); */

  // Otra manera de crear el formulario es usando FormBuilder
  // name: ['', [], []],: Los parametros que recibe son: Valor inicial, validadores sincronos y validadores asincronos.
  // name: Con Validator queda definido asi: Es requerido y minimo de 3 caracteres.
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  });

  constructor( private fb: FormBuilder ) {}

  // Re-establecer y establecer formulario: Que pasa si por URL envio
  // unos datos a mi formulario estos se deben de cargar en el evento onInit
  // mediante el uso de reset así:
  ngOnInit(): void {
    // Acá se carga nuestro producto que puede enviar un Backend.
    // this.myForm.reset( rtx5090 );
  }

  // Otra manera de simplificar la visualización de los mensajes de Error.
  // Para ello creamos un metodo
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
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

  onSave(): void {
    // Aca ejecutamos este consol si pasa las validaciones de Validators
    if ( this.myForm.invalid ) {
      // Aca si el usuario no toca los input y solo el boton de
      // guardar se requiere de que se hagan las validaciones y
      // para ello se usa la propiedad de markAllAsTouched() y con
      // ello marca que todos los campos fueron tocados para poder ejecutar las validaciones.
      this.myForm.markAllAsTouched();
      return;
    };

    console.log(this.myForm.value);

    // Para Re-establecer o establecer el formulario se usa Reset,
    // pero no me deja los valores de algunos campos que viene con un valor inicial,
    // por ello se mandan como parametros y con su respectivo valor.
    this.myForm.reset({ price: 0, inStorage: 0 });
  }

}

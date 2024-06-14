import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent implements OnInit {

  // En wantNotifications el valor de true significa que siempre tiene que haber un elemento seleccionado
  // En termnsAndConditions ahi si tiene que ser un valor verdadero por la validación de requiredTrue
  public myForm: FormGroup = this.fb.group({
    gender: [ 'M', [ Validators.required ] ],
    wantNotifications: [ true, [ Validators.required ] ],
    termnsAndConditions: [ false, [ Validators.requiredTrue ] ]
  });

  // Creamos una propiedad person, para simular que el dato es enviado al formulario
  // a travez de un RestAPI o valores por defecto que se quieren reetablecer en el formulario, y para ello implementamos el onInit.
  public person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  // Otra manera de simplificar la visualización de los mensajes de Error.
  // Para ello creamos un metodo
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  //ngSubmit
  onSave() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log( this.myForm.value );


    // Para quitar esa propieda de termnsAndConditions podemos hacer los siguiente:
    // Desestructuramos el objeto person
    const { termnsAndConditions, ...newPerson } = this.myForm.value;

    // Aca se puede dar el caso que cuando grabe al objeto persona se me va a agregar termnsAndConditions
    // y si se requiere grabar la persona esto me puede generar problemas porque termnsAndConditions no esta definido dentro de this.person.
    // o tambien depende como este diseñado el backend que solo me resiva los dos datos de gender y wantNotifications.
    //this.person = this.myForm.value;
    this.person = newPerson;

    console.log( this.person );
  }

}

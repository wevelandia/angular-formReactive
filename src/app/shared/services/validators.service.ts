import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

// Este servicio me sirve para centra;izar todo lo que va con las validaciones personalizadas.

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if ( value === 'strider' )  {

      return {
        noStrider: true
      }

    }

    return null;

  }

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  // Creamos un nuevo metodo para validar que el password sea igual que password2
  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {
    // Esto me retorna una funcion que me permite tener el control sobre el formulario
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }  // Este es el error del formulario y con la linea anterior le establecemos ese error al input de password2
      }

      // Si son iguales se limpia el error
      formGroup.get(field2)?.setErrors(null);

      return null;

    }
  }

}

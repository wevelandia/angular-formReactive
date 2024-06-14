import { FormControl, ValidationErrors } from "@angular/forms";

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

// Realizamos primero la validación de que el nombre de usuario no puede ser Strider porque ya está en la base de datos
// Esta funcón debe de regresar un objeto con el error
// Una función es asincrona si: Esta amarrada a un Observable o si regresa una Promesa
export const cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

  const value: string = control.value.trim().toLowerCase();

  if ( value === 'strider' )  {

    return {
      noStrider: true
    }

  }

  return null;

}

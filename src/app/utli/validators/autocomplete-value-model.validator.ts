import { FormControl } from '@angular/forms'
import { SelectValueModel } from '../../models/select-value-model'
import * as Parse from 'parse'

/**
 * valida que el contenido del autocomplete sea del tipo SelectValueModel
 * @returns autocompleteValueErrror
 * @param control
 */
export const autocompleteValueModelValidator = (control: FormControl) => {


  const value: SelectValueModel = control.value

  console.log(value)
  if (!value) {return null}

  if (!value.label || !value.value || !(value.value instanceof Parse.Object)) {

    return { autocompleteValueError: true }
  }
  return null
}

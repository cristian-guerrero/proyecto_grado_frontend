import { AbstractControl } from '@angular/forms'

export const JSONValidator = (AC: AbstractControl): { [ key: string ]: boolean } => {
  try {
    JSON.parse(AC.value)
    return null
  } catch (e) {
    return { 'invalidJSON': true }
  }

}
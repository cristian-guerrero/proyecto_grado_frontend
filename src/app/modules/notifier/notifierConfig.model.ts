import { ComponentType } from '@angular/cdk/portal'

export class NotifierConfigModel {

  text?: string
  type?: notificationType
  verticalPosition?: vertical
  horizontalPosition?: horizontal
  duration?: number
  component?: ComponentType<any>
}


type vertical = 'top' | 'bottom'
type horizontal = 'start' | 'center' | 'end' | 'left' | 'right'
export type notificationType = 'success' | 'error' | 'warn'

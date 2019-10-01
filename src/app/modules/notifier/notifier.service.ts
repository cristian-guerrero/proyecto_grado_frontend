import { Injectable } from '@angular/core'
import { NotifierConfigModel } from './notifierConfig.model'
import { MatSnackBar, MatSnackBarRef } from '@angular/material'
import { NotifierComponent } from './notifier.component'

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) {
  }

  /**
   *
   * @param text
   * @param conf
   */
  open(text: string, conf?: NotifierConfigModel): MatSnackBarRef<NotifierComponent> {

    if (!text && !conf.text) {
      throw new Error('Es necesario el mensaje')
    }
    if (!conf) {
      conf = new NotifierConfigModel()
    }

    return this.snackBar.openFromComponent(NotifierComponent, {
      duration: conf.duration || 5000,
      horizontalPosition: conf.horizontalPosition || 'right',
      verticalPosition: conf.verticalPosition || 'top',
      panelClass: conf.type || 'success',
      data: {
        text: text || conf.text
      }
    })

  }

  /**
   *
   */
  created() {
    return this.open('shared.toast.createdData')
  }

  /**
   *
   */
  updated() {
    return this.open('shared.toast.updatedData')
  }

  /**
   *
   */
  genericError() {
    return this.open(null, {
      type: 'error',
      text: 'shared.toast.genericError'
    })
  }

  /**
   *
   */
  updateError() {
    return this.open(null, {
      type: 'error',
      text: 'shared.toast.errorToUpdate'
    })
  }

  /**
   *
   */
  createError() {
    return this.open(null, {
      type: 'error',
      text: 'shared.toast.errorToCreate'
    })
  }

  /**
   *
   */
  loaded() {
    return this.open('shared.toast.loaded')

  }

  /**
   *
   * @param message
   */
  showError(message: string) {
    this.open(message, { type: 'error' })
  }

  /**
   *
   * @param message
   */
  showSuccess(message: string) {
    this.open(message, { type: 'success' })

  }

  /**
   *
   * @param message
   */
  showWarning(message: string) {
    this.open(message, { type: 'warn' })

  }

}

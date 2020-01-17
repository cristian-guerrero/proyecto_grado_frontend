import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { LoadingComponent } from './loading/loading.component'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class LoadingAndNotifierService {


  dialogRef: MatDialogRef<LoadingComponent>

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) { }


  openLoadingComponent(title?: string, message?: string) {

    if (!title) {
      title = 'Por favor espere'
    }
    if (!message) {
      message = 'Estamos procesando la petición.'
    }


    if (this.dialogRef) {
      this.closeLoadingComponent()
    }

    this.dialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true,
      data: {
        title,
        message
      }
    })


  }


  closeLoadingComponent() {
    if (this.dialogRef) {
      this.dialogRef.close()
    }
    // todo poner en null dialogRef

  }

  showMessage(message: string, duration: number = 4000) {

    // todo

    this.snackBar.open(message, undefined, {
      duration,
    })
  }
}

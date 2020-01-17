import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: [ './loading.component.scss' ]
})
export class LoadingComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<LoadingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LoadingComponentData) {


  }


  ngOnInit() {
  }


  canShowTitle() {
    return this.data && this.data.title
  }


  canShowMessage() {
    return this.data && this.data.message
  }


}


export interface LoadingComponentData {

  title: string
  message: string
}


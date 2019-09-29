import { Component, Inject, OnInit } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material'
import { notificationType } from './notifierConfig.model'

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: [ './notifier.component.scss' ]
})
export class NotifierComponent implements OnInit {

  text: string
  type: notificationType

  constructor(@Inject(MAT_SNACK_BAR_DATA) data,
              private ref: MatSnackBarRef<NotifierComponent>) {
    this.text = data.text
    this.type = data.type || 'success'
  }

  ngOnInit() {
  }

  close() {
    this.ref.dismiss()
  }

  action() {

  }
}

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { DialogDataInterface } from '../../../models/dialog-data.interface'

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [ './confirm-dialog.component.scss' ]
})
export class ConfirmDialogComponent implements OnInit {

  title: string

  constructor(private bottomSheetRef: MatBottomSheetRef<ConfirmDialogComponent, boolean>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.title = data
  }

  ngOnInit() {
  }

  dismiss(value: boolean) {

    this.bottomSheetRef.dismiss(value)
  }
}

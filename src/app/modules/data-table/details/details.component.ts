import { Component, Inject, OnInit } from '@angular/core'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { DialogDataInterface } from '../../../models/dialog-data.interface'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: [ './details.component.scss' ]
})
export class DetailsComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<DetailsComponent, Parse.Object>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogDataInterface
  ) {

    console.log(data)
  }

  ngOnInit() {
  }


  cancel() {
    this.bottomSheetRef.dismiss(null)
  }
}

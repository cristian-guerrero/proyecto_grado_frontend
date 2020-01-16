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

    // TODO si el campo  object es diferente de undefined significa que la es una lista padre hijos
    //  de lo contrario es una lista de detalles del mismo objeto por lo tanto la lista deberia traer solo un objeto
    console.log(data)
  }

  ngOnInit() {
  }


  cancel() {
    this.bottomSheetRef.dismiss(null)
  }


  showParent() {
    return !!this.data.object
  }
}

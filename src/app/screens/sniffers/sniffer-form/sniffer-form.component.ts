import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { DialogDataInterface } from '../../../models/dialog-data.interface'

@Component({
  selector: 'app-sniffer-form',
  templateUrl: './sniffer-form.component.html',
  styleUrls: [ './sniffer-form.component.scss' ]
})
export class SnifferFormComponent implements OnInit {

  form: FormGroup

  constructor(private bottomSheetRef: MatBottomSheetRef<SnifferFormComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogDataInterface,
              private fb: FormBuilder) {

    if (this.data.object) {
      this.prepareData(this.data.object)
    }

  }

  ngOnInit() {
  }

  cancel() {
    this.bottomSheetRef.dismiss(null)
  }

  action() {

  }


  buildForm() {
    return this.fb.group({
      // sniffer y fecha autocomplete y fecha
    })
  }


  prepareData(object: Parse.Object) {
    console.log(object)

  }

  patchValue() {

  }

  fechData() {

  }
}

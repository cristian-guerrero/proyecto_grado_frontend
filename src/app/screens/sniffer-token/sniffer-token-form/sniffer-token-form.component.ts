import { Component, OnInit } from '@angular/core'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-sniffer-token-form',
  templateUrl: './sniffer-token-form.component.html',
  styleUrls: [ './sniffer-token-form.component.scss' ]
})
export class SnifferTokenFormComponent implements OnInit {


  form: FormGroup

  constructor(private bottomSheetRef: MatBottomSheetRef<SnifferTokenFormComponent>,
              private fb: FormBuilder) {

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
}

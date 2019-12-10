import { Component, Inject, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { DialogDataInterface } from '../../../models/dialog-data.interface'
import { SnifferClass } from '../../../models/sniffer-class'
import { ParseService } from '../../../services/parse.service'
import { Consts } from '../../../utli'
import { JSONValidator } from '../../../utli/JSON-validator'
import { SharedService } from '../../../services/shared.service'

@Component({
  selector: 'app-sniffer-form',
  templateUrl: './sniffer-form.component.html',
  styleUrls: [ './sniffer-form.component.scss' ]
})
export class SnifferFormComponent implements OnInit {

  form: FormGroup
  formField = SnifferClass

  constructor(private bottomSheetRef: MatBottomSheetRef<SnifferFormComponent, Parse.Object>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogDataInterface,
              private fb: FormBuilder,
              private parse: ParseService,
              private sharedService: SharedService) {

    if (this.data.object) {
      this.prepareData(this.data.object)
    }

  }

  ngOnInit() {
    this.form = this.buildForm(this.fb)
  }

  cancel() {
    this.bottomSheetRef.dismiss(null)
  }

  action() {
    if (this.form.valid) {
      if (this.data.object) {
        this.update()
      } else {
        this.create()
      }

    }
  }

  create() {
    const data = { ...this.form.value }
    data[ SnifferClass.CONFIG ] = JSON.parse(data[ SnifferClass.CONFIG ])
    this.parse.createObject(data, Consts.PUBLIC_ACL, SnifferClass.className).subscribe(res => {
      console.log(res)
      this.bottomSheetRef.dismiss(res)
      // todo mostrar mensaje
    }, err => {
      // todo mostrar mensaje
      console.log(err)
    })
  }

  update() {

    const data = this.sharedService.prepareObjectToUpdate(this.form)
  }


  buildForm(fb: FormBuilder) {
    return fb.group({
      [ SnifferClass.IP ]: [ null, [ Validators.required, Validators.pattern(Consts.PATTERNS.ip) ] ],
      [ SnifferClass.NAME ]: [ null, [ Validators.required ] ],
      [ SnifferClass.CONFIG ]: [ null, [ Validators.required, JSONValidator ] ],
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
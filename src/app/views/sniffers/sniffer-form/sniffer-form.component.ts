import { Component, Inject, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { DialogDataInterface } from '../../../models/dialog-data.interface'
import { SnifferClass } from '../../../models/sniffer-class'
import { ParseService } from '../../../services/parse.service'
import { Consts } from '../../../utli'
import { JSONValidator } from '../../../utli/JSON-validator'
import { SharedService } from '../../../services/shared.service'
import { LoadingAndNotifierService } from '../../../modules/loading-and-notifier/loading-and-notifier.service'

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
              private sharedService: SharedService,
              private loadingService: LoadingAndNotifierService) {

    if (this.data.object) {
      //  this.prepareData(this.data.object)
      //  this.patchValue(this.data.object)
    }

  }

  ngOnInit() {
    this.form = this.buildForm(this.fb)
    if (this.data && this.data.object) {
      this.patchValue(this.data.object, this.form)
    }
  }

  cancel() {
    this.bottomSheetRef.dismiss(null)
  }

  action() {
    if (this.form.valid) {
      this.loadingService.openLoadingComponent()
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
      this.loadingService.closeLoadingComponent()
      this.bottomSheetRef.dismiss(res)
      // todo mostrar mensaje
    }, err => {
      // todo mostrar mensaje
      console.log(err)
      this.loadingService.closeLoadingComponent()
    })
  }

  update() {

    const data = this.sharedService.prepareObjectToUpdate(this.form)
    if (data[ SnifferClass.CONFIG ]) {
      data[ SnifferClass.CONFIG ] = JSON.parse(data[ SnifferClass.CONFIG ])
    }
    this.parse.updateObject(this.data.object, data).subscribe(res => {
      console.log(res)
      this.loadingService.closeLoadingComponent()
      this.bottomSheetRef.dismiss(res)
    }, err => {
      this.loadingService.closeLoadingComponent()
    })
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

  patchValue(object: Parse.Object, form: FormGroup) {

    form.patchValue({
      [ SnifferClass.IP ]: object.get(SnifferClass.IP),
      [ SnifferClass.NAME ]: object.get(SnifferClass.NAME),
      [ SnifferClass.CONFIG ]: object.has(SnifferClass.CONFIG) ? JSON.stringify(object.get(SnifferClass.CONFIG)) : '{}',

    })
  }

  fechData() {

  }
}

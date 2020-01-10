import { Component, OnInit } from '@angular/core'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { SelectValueModel } from '../../../models/select-value-model'
import { Observable, of } from 'rxjs'
import { TokenClass } from '../../../models/token-class'
import { debounceTime, map, mergeMap, startWith, tap } from 'rxjs/operators'
import { SnifferTokenService } from '../../../services/sniffer-token.service'

import * as moment from 'moment'
@Component({
  selector: 'app-sniffer-token-form',
  templateUrl: './sniffer-token-form.component.html',
  styleUrls: [ './sniffer-token-form.component.scss' ],
  providers: [
    SnifferTokenService
  ]
})
export class SnifferTokenFormComponent implements OnInit {


  formField = TokenClass
  form: FormGroup

  filteredLeList: Observable<SelectValueModel[]>

  isLoadingAutocomplete = false

  minDate: Date


  constructor(private service: SnifferTokenService,
              private bottomSheetRef: MatBottomSheetRef<SnifferTokenFormComponent>) {

  }

  ngOnInit() {
    this.minDate = moment().toDate()
    this.form = this.service.buildSnifferTokenForm()
    this.filteredLeList = this.filterApplicationList(this.form.controls[ TokenClass.SNIFFER ] as FormControl)

  }


  cancel() {
    this.bottomSheetRef.dismiss(null)
  }

  action() {

    if (!this.form.valid) {return}

    this.service.create(this.form).subscribe(res => {
      console.log(res)
      // todo mostrar mensaje de exito
      this.bottomSheetRef.dismiss(res)
    }, error => {
      // todo mostrar mensaje si ocurre un error
      console.error(error)
    })

  }


  /**
   * -------------- Autocomplete methods --------------
   *
   */


  /**
   *
   *
   */
  displayAutocomplete(element: SelectValueModel): string {
    return element ? element.label : null
  }


  /**
   *
   *
   */
  filterApplicationList(control: FormControl): Observable<SelectValueModel[]> {
    // console.log(control)
    return control.valueChanges.pipe(
      map(x => typeof x === 'string' ? x : null),
      tap(x => this.isLoadingAutocomplete = !(!x || x === '')),
      debounceTime(400),
      // startWith(''), // importante para desplegar las opciones al dar click en el input
      mergeMap(x => this.service.filterApplicationListCallback(x)),
      tap(x => this.isLoadingAutocomplete = false)
    )
  }

}

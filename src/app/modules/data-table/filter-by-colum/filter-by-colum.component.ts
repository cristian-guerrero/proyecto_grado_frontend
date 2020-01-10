import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SnifferClass } from '../../../models/sniffer-class'
import { Consts } from '../../../utli'
import { ParseService } from '../../../services/parse.service'
import { FilterColumnType, SelectValue } from './filterByColumnModels'
import * as Parse from 'parse'
import { COLUMNS_NAME } from '../util'

import * as moment from 'moment'

@Component({
  selector: 'app-filter-by-colum',
  templateUrl: './filter-by-colum.component.html',
  styleUrls: [ './filter-by-colum.component.scss' ]
})
export class FilterByColumComponent implements OnInit, OnChanges {

  @Input()
  get query(): Parse.Query {
    return this._query
  }

  set query(query: Parse.Query) {
    // console.log(query)
    this._query = query
    this.queryChange.emit(this._query)
    // this.getSchema()
  }

  @Input()
  schema: any

  @Output() queryChange: EventEmitter<Parse.Query> = new EventEmitter()

  // tslint:disable-next-line:variable-name
  _query: Parse.Query

  form: FormGroup

  colums: SelectValue []

  columnType = FilterColumnType

  constructor(private fb: FormBuilder, private parse: ParseService) { }

  ngOnInit() {
    this.form = this.buildForm(this.fb)
    this.setColumns(this.schema)

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes)
    this.setColumns(this.schema)
  }

  buildForm(fb: FormBuilder): FormGroup {

    return fb.group({
      value: [ null, [ Validators.required ] ],
      attribute: [ null, [ Validators.required ] ],
    })
  }

  /**
   * Crear la consulta con los parametros seleccionados en el filtro
   * Los parametros se toman del formulario, solo si el formulario es valido
   */
  buildQuery() {
    if (!this.form.valid) {
      return
    }

    // tslint:disable-next-line:prefer-const
    let { attribute, value } = this.form.value

    const newQuery = this.parse.cloneParseQuery(this.query)

    if (moment.isMoment(value)) {

      // value = value.toDate()
      const starDay = value.startOf('d').toDate()
      const endDay = value.endOf('d').toDate()

      newQuery.greaterThanOrEqualTo(attribute, starDay)
      newQuery.lessThanOrEqualTo(attribute, endDay)

    } else if (value.constructor === String) {
      console.log('string: ' + value)
      value = value.trim()
      newQuery.equalTo(attribute, value)
    } else {
      console.log('El formato del dato no es conocido: ', value)
    }
    console.log(newQuery, attribute, value)


    this.query = newQuery

  }

  resetFilter() {
    this.form.patchValue({
      attribute: null,
      value: null
    }, { emitEvent: false, onlySelf: true })
    // this.form.controls.value.markAsPristine()
    // this.form.controls.attribute.markAsPristine()


    const limit = '_limit'
    const query = new Parse.Query(this.query.className)
    query.skip(0)
    query.limit(this.query[ limit ])
    this.query = query
  }


  setColumns(schema) {
    if (!schema) {return }
    const s: SelectValue [] = []
    const names = COLUMNS_NAME

    // tslint:disable-next-line:forin
    for (const x in schema) {
      if (!names.hasOwnProperty(x)) {
        throw new Error(` Consts.COLUMNS_NAME no puede resolver la clave ${ x } de esquema requerida`)
      }
      s.push({ label: names[ x ], value: x })

    }

    this.colums = s

  }

  getColumType(): FilterColumnType {
    const { attribute } = this.form.value

    if (!this.form.value.attribute || !this.schema[ attribute ] || !this.schema[ attribute ].type) {
      return FilterColumnType.TEXT
    }

    const schemaType = this.schema[ attribute ].type as FilterColumnType

    // console.log(schemaType)
    switch (schemaType) {

      case FilterColumnType.TEXT:
      case FilterColumnType.OBJECT:
        return FilterColumnType.TEXT
      case FilterColumnType.DATE:
        return FilterColumnType.DATE
      case FilterColumnType.BOOLEAN:
        return FilterColumnType.BOOLEAN
    }

  }
}


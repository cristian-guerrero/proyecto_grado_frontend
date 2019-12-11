import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SnifferClass } from '../../../models/sniffer-class'
import { Consts } from '../../../utli'
import { ParseService } from '../../../services/parse.service'
import { FilterColumnType, SelectValue } from './filterByColumnModels'
import * as Parse from 'parse'

@Component({
  selector: 'app-filter-by-colum',
  templateUrl: './filter-by-colum.component.html',
  styleUrls: [ './filter-by-colum.component.scss' ]
})
export class FilterByColumComponent implements OnInit {

  @Input()
  get query(): Parse.Query {
    return this._query
  }

  set query(query: Parse.Query) {
    // console.log(query)
    this._query = query
    this.queryChange.emit(this._query)
    this.getSchema()
  }

  @Output() queryChange: EventEmitter<Parse.Query> = new EventEmitter()

  // tslint:disable-next-line:variable-name
  _query: Parse.Query

  form: FormGroup

  colums: SelectValue []
  schema: any

  columnType = FilterColumnType

  constructor(private fb: FormBuilder, private parse: ParseService) { }

  ngOnInit() {
    this.form = this.buildForm(this.fb)

  }

  buildForm(fb: FormBuilder): FormGroup {

    return fb.group({
      value: [ null, [ Validators.required ] ],
      attribute: [ null, [ Validators.required ] ],
    })
  }

  buildQuery() {
    if (!this.form.valid) {
      return
    }

    const { attribute, value } = this.form.value
    console.log(this.query, attribute, value)

    this._query.equalTo(attribute, value.trim())


    this.query = this._query

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

  getSchema() {

    this.parse.runCloudFunction(Consts.CLOUD_FUNCTION.FILTER_COLUMNS, { className: this.query.className }).subscribe(res => {
      // console.log(res)
      this.schema = res

      this.setColumns(res)

    })
  }

  setColumns(schema) {
    const s: SelectValue [] = []
    const names = Consts.COLUMNS_NAME

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


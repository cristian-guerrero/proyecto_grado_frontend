import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { MatSort, Sort } from '@angular/material/sort'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { Observable, of, Subscription } from 'rxjs'
import { fromMatPaginator, fromMatSort, paginateRows, sortRows } from '../data-util'
import { debounceTime, flatMap, map } from 'rxjs/operators'
import { MatTableDataSource } from '@angular/material/table'
import { ParseService } from '../../../services/parse.service'
import * as Parse from 'parse'
import { Consts } from '../../../utli'
import { DataTableService } from '../data-table.service'
import { SelectValue } from '../filter-by-colum/filterByColumnModels'
import { TableCallbackContent, COLUMNS_NAME, TABLE_ACTIONS, TableActionId } from '../util'
import { DetailsComponent } from '../details/details.component'
import { LoadingAndNotifierService } from '../../loading-and-notifier/loading-and-notifier.service'


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: [ './data-table.component.scss' ]
})
export class DataTableComponent implements OnInit, OnDestroy, OnChanges {

  data: Parse.Object[]
  schema: any

  columns: string[]
  columnsNames: SelectValue []


  @Input()
  only: string[]

  @Input()
  discard: string []

  @Input()
  get query(): Parse.Query {
    return this._query
  }

  set query(query: Parse.Query) {
    console.log(query)
    this._query = query

    this.paginator.pageIndex = 0
    // todo modificar este llamdo despues para que no se llame 3 veces al iniciar el componente
    this.findByQuery(query, true)

    this.queryChange.emit(this._query)
    this.getSchema()
  }

  /**
   * Emisor de evento para cuando cambie la parse query
   */
  @Output() queryChange: EventEmitter<Parse.Query> = new EventEmitter()

  /**
   * Emisor de eventos para cuando se presione un boton de acción de un registro
   */
  @Output() actionCallback: EventEmitter<TableCallbackContent> = new EventEmitter()

  /**
   * lista de botones de acción posibles para cada registro
   */
  actionButtons = TABLE_ACTIONS
  @Input() hideActionButtons: TableActionId []

  // tslint:disable-next-line:variable-name
  _query: Parse.Query

  dataSource: MatTableDataSource<Parse.Object>


  /**
   * paginator config
   */
  pageSizeOptions = [ 5, 15, 25 ]
  pageSize = 5
  totalRows = 0
  pageEvent: PageEvent
  pageIndex = 0

  subscription: Subscription

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  constructor(private parse: ParseService,
              private service: DataTableService,
              private notifier: LoadingAndNotifierService) {}

  ngOnInit() {
    this.findByQuery(this._query, true)
    this.hiddeActionButton()


    this.notifier.showMessage('Un mensaje')


  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    /*
    if (changes.query.currentValue) {
      console.log(changes.query.currentValue)
      // this.pageIndex = 0
      this.paginator.pageIndex = 0

      this.findByQuery(changes.query.currentValue, true)
    }
    */
  }

  onChangePage($event: PageEvent) {
    console.log($event)
    this.pageEvent = $event
    this.pageSize = $event.pageSize
    this.pageIndex = $event.pageIndex
    this.findByQuery(this._query)
  }

  // todo pasar esta funcionalidad al servicio
  findData([ skip, limit ], query, withCount) {
    this.notifier.openLoadingComponent()
    this.subscription = this.parse.findWithCount(query, limit, skip, withCount).subscribe(res => {
      console.log(res, limit, skip)
      if (res.count) {
        this.totalRows = res.count
      }
      // console.log(res.data)
      this.data = res.data
      // this.mapDataTable()

      this.dataSource = new MatTableDataSource<Parse.Object>(res.data)
      this.notifier.closeLoadingComponent()

    }, err => {
      this.notifier.closeLoadingComponent()
    })
  }


  findByQuery(query: Parse.Query, isNewQuery = false) {
    // this.paginator.pageIndex = 0
    if (!this.pageEvent || isNewQuery) {
      this.findData([ 0, this.pageSize ], query, true)
    } else {
      // console.log(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize)
      this.findData([ this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize ],
        query, false)
    }
  }


  getSchema() {
    this.service.getSchema(this.query).subscribe(res => {
      // console.log(res)
      this.schema = res
      this.setColumns(res)
    })
  }

  setColumns(schema) {

    console.log(schema)

    if (!schema) {return }

    const cloneSchema = { ...schema }

    const tempSchema = {}
    const colums: string [] = []
    const columnsNames: SelectValue [] = []


    if (this.discard) {
      for (const n of this.discard) {
        if (cloneSchema.hasOwnProperty(n)) {
          delete cloneSchema[ n ]
        }
      }
    }

    if (this.only) {
      for (const n of this.only) {
        if (cloneSchema.hasOwnProperty(n)) {
          tempSchema[ n ] = schema[ n ]
        }
      }
    }


    // tslint:disable-next-line:forin
    for (const x in tempSchema) {

      colums.push(x)
      columnsNames.push({ label: this.service.getFieldName(x), value: x })
    }
    colums.push('actions')

    columnsNames.push({ label: 'Acciones', value: 'actions' })

    this.columns = colums
    this.columnsNames = columnsNames

    console.log(columnsNames)
  }


  /**
   * Retorna el nombre de la columna pasandole el id
   * @param value
   */
  getColumnName(value: string) {

    return this.columnsNames.find(x => x.value === value).label

  }

  /**
   * Callback para los botones de acciones de cada una de los registros de la tabla
   * @param object
   * @param id
   */
  buttonActionCallback(object: Parse.Object, id: TableActionId) {


    this.actionCallback.emit(new TableCallbackContent(id, object))

    if (id === TableActionId.DETAILS) {
      this.openDetailsModal(object)
    } else if (id === TableActionId.DELETE) {
      this.openDeleteConfirmation(object)
    }
  }

  /**
   * Oculta los botones de accion que no se deben mostrar en la tabla
   */
  hiddeActionButton() {
    if (!this.hideActionButtons) {return }
    const temp = [ ...this.actionButtons ]
    for (const x of this.hideActionButtons) {

      for (const y of temp) {
        console.log(y)
        if (x === y.id) {
          y.active = false
        }
      }
    }

    this.actionButtons = temp


  }

  /**
   * Metodo para abrir el modal donde se mostraran los detalles del objeto
   * @param object
   */
  openDetailsModal(object: Parse.Object) {

    this.service.openDetailsModal(object, DetailsComponent).subscribe(res => {
      console.log(res)
    })
  }

  /**
   * modal de confirmación antes de eliminar un objeto
   * @param object
   */
  openDeleteConfirmation(object: Parse.Object) {
    this.service.openConfirmDeleteDialog(object, this.data).subscribe(res => {
      if (res) {
        console.log(this.totalRows)
        this.totalRows -= 1
        this.data = res

        this.dataSource = new MatTableDataSource<Parse.Object>(res)
      }
    })
  }

  /**

   * @param object
   * @param key
   */
  pipeData(object: Parse.Object, key: string) {

    return this.service.pipeData(object, key)

  }


}



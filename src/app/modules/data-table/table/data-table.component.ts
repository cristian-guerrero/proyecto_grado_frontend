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

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: [ './data-table.component.scss' ]
})
export class DataTableComponent implements OnInit, OnDestroy, OnChanges {

  data: Parse.Object[]

  @Input()
  columns: string[]

  @Input()
  metadata: any


  @Input()
  get query(): Parse.Query {
    return this._query
  }

  set query(query: Parse.Query) {
    console.log(query)
    this._query = query

    this.paginator.pageIndex = 0
    this.findByQuery(query, true)

    this.queryChange.emit(this._query)
  }

  @Output() queryChange: EventEmitter<Parse.Query> = new EventEmitter()

  // tslint:disable-next-line:variable-name
  _query: Parse.Query

  dataSource: MatTableDataSource<Parse.Object>


  /**
   * paginator config
   */
  pageSizeOptions = [ 5, 15, 25 ]
  pageSize = 5
  totalRows: number
  pageEvent: PageEvent
  pageIndex: number

  subscription: Subscription

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  constructor(private parse: ParseService) {}

  ngOnInit() {
    this.findByQuery(this._query, true)
    this.columns = [ ...this.columns, 'actions' ]

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

  findData([ skip, limit ], query, withCount) {
    this.subscription = this.parse.findWithCount(query, limit, skip, withCount).subscribe(res => {
      console.log(res, limit, skip)
      if (res.count) {
        this.totalRows = res.count
      }
      // console.log(res.data)
      this.data = res.data
      // this.mapDataTable()
      this.dataSource = new MatTableDataSource<Parse.Object>(this.data)
    })
  }


  findByQuery(query: Parse.Query, isNewQuery = false) {
    // this.paginator.pageIndex = 0
    if (!this.pageEvent || isNewQuery) {
      this.findData([ 0, this.pageSize ], query, true)
    } else {
      console.log(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize)
      this.findData([ this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize ],
        query, false)
    }
  }


}


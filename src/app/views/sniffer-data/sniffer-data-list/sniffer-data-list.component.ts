import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import * as Parse from 'parse'
import { TableActionId } from '../../../modules/data-table/util'

@Component({
  selector: 'app-sniffer-data-list',
  templateUrl: './sniffer-data-list.component.html',
  styleUrls: [ './sniffer-data-list.component.scss' ]
})
export class SnifferDataListComponent implements OnInit {

  query: Parse.Query
  only: string []
  discard: string []
  hideActionButtons: TableActionId[ ]


  constructor(private route: ActivatedRoute) {


  }

  ngOnInit() {

    const { query, hideActionButtons, only, discard } = this.route.snapshot.data.data
    this.query = query
    this.only = only
    this.discard = discard
    this.hideActionButtons = hideActionButtons
  }

}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SnifferTokenFormComponent } from '../sniffer-token-form/sniffer-token-form.component'
import { TableActionId } from '../../../modules/data-table/util'

import * as Parse from 'parse'
import { ParseService } from '../../../services/parse.service'

@Component({
  selector: 'app-sniffer-token-list',
  templateUrl: './sniffer-token-list.component.html',
  styleUrls: [ './sniffer-token-list.component.scss' ]
})
export class SnifferTokenListComponent implements OnInit {

  query: Parse.Query
  only: string []
  discard: string []

  hideActionButtons: TableActionId[ ]

  constructor(private route: ActivatedRoute,
              private bottonSheet: MatBottomSheet,
              private parse: ParseService) {

  }

  ngOnInit() {
    // console.log(this.data)
    const { query, hideActionButtons, only, discard } = this.route.snapshot.data.data
    this.query = query
    this.only = only
    this.discard = discard
    this.hideActionButtons = hideActionButtons
  }


  /**
   * se neceita clonar la query para que la tabla reaccione y realize
   * la consulta nuevamente con los nuevos datos
   * @param type
   */
  openAddDialog(type?: string) {

    this.bottonSheet.open(SnifferTokenFormComponent, {
      disableClose: true
    }).afterDismissed().subscribe(res => {
      console.log('sheet dismiss')
      this.query = this.parse.cloneParseQuery(this.query)
    })

  }

}

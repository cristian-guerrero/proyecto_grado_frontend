import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SnifferFormComponent } from '../sniffer-form/sniffer-form.component'
import { SnifferClass } from '../../../models/sniffer-class'
import { TableActionId, TableCallbackContent } from '../../../modules/data-table/util'

@Component({
  selector: 'app-sniffers-list',
  templateUrl: './sniffers-list.component.html',
  styleUrls: [ './sniffers-list.component.scss' ]
})
export class SniffersListComponent implements OnInit {

  query: Parse.Query
  only: string []
  discard: string []
  hideActionButtons: TableActionId[ ]

  constructor(private route: ActivatedRoute,
              private bottonSheet: MatBottomSheet) {

  }

  ngOnInit() {
    // console.log(this.data)
    const { query, only, discard, hideActionButtons } = this.route.snapshot.data.data
    this.query = query
    this.only = only
    this.discard = discard
    this.hideActionButtons = hideActionButtons
  }


  openAddDialog(object?: Parse.Object) {

    this.bottonSheet.open(SnifferFormComponent, {
      data: { object }
    }).afterDismissed().subscribe(res => {
      console.log('sheet dismiss')
    })

  }

  /**
   * Recibe el evento de la tabla
   * Solo se esta utilizando el evento de editar
   * Al editar parse actualiza el objeto porque esta por referencia (por lo tanto la tabla se actualiza)
   * @param event
   */
  actionCallback(event: TableCallbackContent) {

    if (event.id === TableActionId.EDIT) {
      this.openAddDialog(event.object)
    }
  }

}

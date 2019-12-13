import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SnifferFormComponent } from '../sniffer-form/sniffer-form.component'
import { SnifferClass } from '../../../models/sniffer-class'

@Component({
  selector: 'app-sniffers-list',
  templateUrl: './sniffers-list.component.html',
  styleUrls: [ './sniffers-list.component.scss' ]
})
export class SniffersListComponent implements OnInit {

  query: Parse.Query
  only: string []
  discard: string []

  constructor(private route: ActivatedRoute,
              private bottonSheet: MatBottomSheet) {

  }

  ngOnInit() {
    // console.log(this.data)
    const { query, only, discard } = this.route.snapshot.data.data
    this.query = query
    this.only = only
    this.discard = discard
  }


  openAddDialog(object?: Parse.Object) {

    this.bottonSheet.open(SnifferFormComponent, {
      data: { object }
    }).afterDismissed().subscribe(res => {
      console.log('sheet dismiss')
    })

  }


}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SnifferTokenFormComponent } from '../sniffer-token-form/sniffer-token-form.component'

@Component({
  selector: 'app-sniffer-token-list',
  templateUrl: './sniffer-token-list.component.html',
  styleUrls: [ './sniffer-token-list.component.scss' ]
})
export class SnifferTokenListComponent implements OnInit {

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


  openAddDialog(type?: string) {

    this.bottonSheet.open(SnifferTokenFormComponent, {
      disableClose: true
    }).afterDismissed().subscribe(res => {
      console.log('sheet dismiss')
    })

  }

}

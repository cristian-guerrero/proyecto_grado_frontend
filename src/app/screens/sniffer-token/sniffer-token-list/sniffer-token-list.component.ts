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

  data

  constructor(private route: ActivatedRoute,
              private bottonSheet: MatBottomSheet) {

  }

  ngOnInit() {

    this.data = this.route.snapshot.data.data
    console.log(this.data)
  }


  openAddDialog(type?: string) {

    this.bottonSheet.open(SnifferTokenFormComponent).afterDismissed().subscribe(res => {
      console.log('sheet dismiss')
    })

  }

}

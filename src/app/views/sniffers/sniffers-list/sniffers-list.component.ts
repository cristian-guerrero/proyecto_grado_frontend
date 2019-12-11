import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SnifferFormComponent } from '../sniffer-form/sniffer-form.component'

@Component({
  selector: 'app-sniffers-list',
  templateUrl: './sniffers-list.component.html',
  styleUrls: [ './sniffers-list.component.scss' ]
})
export class SniffersListComponent implements OnInit {

  query: Parse.Query

  columns: string[]

  constructor(private route: ActivatedRoute,
              private bottonSheet: MatBottomSheet) {

  }

  ngOnInit() {
    // console.log(this.data)
    this.query = this.route.snapshot.data.data
    this.columns = [ 'ip', 'name', 'active' ]
  }


  openAddDialog(object?: Parse.Object) {

    this.bottonSheet.open(SnifferFormComponent, {
      data: { object }
    }).afterDismissed().subscribe(res => {
      console.log('sheet dismiss')
    })

  }


}

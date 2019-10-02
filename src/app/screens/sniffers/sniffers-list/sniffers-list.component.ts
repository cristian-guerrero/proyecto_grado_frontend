import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SnifferFormComponent } from '../sniffer-form/sniffer-form.component'

@Component({
  selector: 'app-sniffers-list',
  templateUrl: './sniffers-list.component.html',
  styleUrls: [ './sniffers-list.component.scss' ]
})
export class SniffersListComponent implements OnInit {

  data: Parse.Object []

  constructor(private route: ActivatedRoute,
              private bottonSheet: MatBottomSheet) {

  }

  ngOnInit() {

    this.data = this.route.snapshot.data.data
    console.log(this.data)
  }


  openAddDialog(object?: Parse.Object) {

    this.bottonSheet.open(SnifferFormComponent, {
      data: { object }
    }).afterDismissed().subscribe(res => {
      console.log('sheet dismiss')
    })

  }

}

import { Component, Input, OnInit } from '@angular/core'
import { SharedService } from '../../services/shared.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: [ './toolbar.component.scss' ]
})
export class AppToolbarComponent implements OnInit {


  @Input() title = 'Nombre pantalla'

  constructor(private shared: SharedService) {
  }

  ngOnInit() {
  }

  exit() {
    this.shared.logOut()
  }
}

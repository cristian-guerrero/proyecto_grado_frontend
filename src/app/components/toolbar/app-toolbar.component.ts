import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: [ './toolbar.component.scss' ]
})
export class AppToolbarComponent implements OnInit {


  @Input() title = 'Nombre pantalla'

  constructor() {
  }

  ngOnInit() {
  }

}

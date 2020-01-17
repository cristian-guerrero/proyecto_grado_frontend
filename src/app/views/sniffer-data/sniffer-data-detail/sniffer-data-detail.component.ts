import { Component, OnInit } from '@angular/core';

/**
 *
 * este componente esta obsoleto ya que se va a utilzar un componente generico
 * que se encuentra en el modulo data-table
 * eliminar despues
 * @deprecated
 */
@Component({
  selector: 'app-sniffer-data-detail',
  templateUrl: './sniffer-data-detail.component.html',
  styleUrls: ['./sniffer-data-detail.component.scss']
})
export class SnifferDataDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

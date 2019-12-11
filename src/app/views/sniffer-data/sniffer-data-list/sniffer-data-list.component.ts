import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-sniffer-data-list',
  templateUrl: './sniffer-data-list.component.html',
  styleUrls: ['./sniffer-data-list.component.scss']
})
export class SnifferDataListComponent implements OnInit {

  query: Parse.Query

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.query = this.route.snapshot.data.data
  }

}

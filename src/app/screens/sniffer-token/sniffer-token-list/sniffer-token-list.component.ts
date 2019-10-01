import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-sniffer-token-list',
  templateUrl: './sniffer-token-list.component.html',
  styleUrls: ['./sniffer-token-list.component.scss']
})
export class SnifferTokenListComponent implements OnInit {

  data
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.data = this.route.snapshot.data
    console.log(this.data)
  }

}

import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { DataClass } from '../models/data-class'
import { ParseService } from '../services/parse.service'
import * as Parse from 'parse'
import { TableActionId } from '../modules/data-table/util'
import { TokenClass } from '../models/token-class'

@Injectable({
  providedIn: 'root'
})
export class SnifferDataResolverService implements Resolve<any> {

  constructor(private parse: ParseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route.data)
    // return this.findData()
    return of({
      query: this.query(),
      only: [
        DataClass.OBJECT_ID,
        DataClass.IP,
        DataClass.SNIFFER,
        DataClass.PROTOCOL,
        DataClass.TOKEN,
      ],
      //  discard: [ SnifferClass.IP ],
      hideActionButtons: [ TableActionId.EDIT ]
    })
  }


  query(): Parse.Query {

    const q = new Parse.Query(DataClass.className)
    q.descending(TokenClass.CREATED_AT)
    return q
  }
}

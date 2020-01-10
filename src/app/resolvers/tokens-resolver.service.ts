import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import * as Parse from 'parse'
import { SnifferClass } from '../models/sniffer-class'
import { TokenClass } from '../models/token-class'
import { TableActionId } from '../modules/data-table/util'

@Injectable({
  providedIn: 'root'
})
export class TokensResolverService implements Resolve<any> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route.data)
    // return undefined
    //   return of(route.data).pipe(delay(3000))
    return of({
      query: this.query(),
      only: [
        TokenClass.OBJECT_ID,
        TokenClass.EXPIRY,
        TokenClass.CREATED_AT,
        TokenClass.SNIFFER,
        TokenClass.HASH
      ],
      //  discard: [ SnifferClass.IP ]
      hideActionButtons : [TableActionId.EDIT]

    })
  }


  query(): Parse.Query {
    const  q =  new Parse.Query(TokenClass.className)
    q.descending(TokenClass.CREATED_AT)
    return q
  }
}

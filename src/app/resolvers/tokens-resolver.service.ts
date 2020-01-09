import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import * as Parse from 'parse'
import { SnifferClass } from '../models/sniffer-class'
import { TokenClass } from '../models/token-class'

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

    })
  }


  query(): Parse.Query {
    return new Parse.Query(TokenClass.className)
  }
}

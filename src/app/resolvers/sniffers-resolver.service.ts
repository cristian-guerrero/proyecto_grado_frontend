import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { SnifferClass } from '../models/sniffer-class'
import { ParseService } from '../services/parse.service'
import * as Parse from 'parse'

@Injectable({
  providedIn: 'root'
})
export class SniffersResolverService implements Resolve<any> {

  constructor(private parse: ParseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route.data)
    // return this.findData()
    return of({
      query: this.query(),
      only: [
        SnifferClass.OBJECT_ID,
        SnifferClass.IP,
        SnifferClass.NAME,
      ],
     //  discard: [ SnifferClass.IP ]

    })
  }

  findData(): Observable<Parse.Object[]> {
    // todo hacer una funcion que busque paginado
    const q = new Parse.Query(SnifferClass.className)
    return this.parse.findByQuery(q)
  }

  query(): Parse.Query {
    return new Parse.Query(SnifferClass.className)
  }
}

import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { DataClass } from '../models/data-class'
import { ParseService } from '../services/parse.service'
import * as Parse from 'parse'

@Injectable({
  providedIn: 'root'
})
export class SnifferDataResolverService implements Resolve<any> {

  constructor(private parse: ParseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route.data)
    // return this.findData()
    return this.query()
  }


  query(): Observable<Parse.Query> {
    return of(new Parse.Query(DataClass.className))
  }
}

import { Injectable } from '@angular/core'
import * as Parse from 'parse'
import { BehaviorSubject, forkJoin, from, Observable, of, Subject, throwError } from 'rxjs'
import { catchError, defaultIfEmpty, map, mergeMap, skipWhile, tap } from 'rxjs/operators'
import { Consts } from '../utli'
import { Router } from '@angular/router'

const parseRequire = require('parse')


@Injectable()
export class ParseService {

  constructor(private router: Router) {
    Parse.initialize(Consts.parseConf.applicationId)
    parseRequire.serverURL = Consts.parseConf.serverURL
  }

  logOut(): Promise<any> {
    return Parse.User.logOut()
  }


  logIn = ({ username, password }): Observable<Parse.User> => {
    return from(Parse.User.logIn(username, password))
  }


  isLogin = (): boolean => !!Parse.User.current()
  getUser = (): Parse.User => Parse.User.current()


  getObjectByIdWithQuery = (id: string, query: Parse.Query): Observable<Parse.Object> => {
    return from(query.get(id)).pipe(catchError(err => {
        this.handleErrors(err)
        return throwError(err)
      })
    )

  }


  findByQuery = (query: Parse.Query, defaultLimit = true): Observable<Parse.Object[]> => {
    if (defaultLimit) {
      query.limit(2000)
    }
    return from(query.find()).pipe(catchError(err => {
        this.handleErrors(err)
        return throwError(err)
      })
    )

  }


  updateObject = (ob: Parse.Object, data: any): Observable<Parse.Object> => {
    ob.set(data)
    return from(ob.save()).pipe(catchError(err => {
        this.handleErrors(err)
        return throwError(err)
      })
    )
  }

  createObjectWithoutData(id: string, className: string): Parse.Object {
    const parseObject = Parse.Object.createWithoutData(id)
    parseObject.className = className
    return parseObject
  }


  findFirstByQuery = (query: Parse.Query): Observable<Parse.Object> => {
    return from(query.first()).pipe(catchError(err => {
        this.handleErrors(err)
        return throwError(err)
      })
    )
  }


  runCloudFunction = (name: string, data: any = null): Observable<any> => {
    return from(Parse.Cloud.run(name, data)).pipe(catchError(err => {
        this.handleErrors(err)
        return throwError(err)
      })
    )
  }


  createObject(data: any, acl: Parse.ACL, className: string): Observable<Parse.Object> {
    const ob = new Parse.Object(className)
    data.active = true
    ob.set(data)
    ob.setACL(acl)
    return from(ob.save()).pipe(catchError(err => {
        this.handleErrors(err)
        return throwError(err)
      })
    )

  }


  fetch(ob: Parse.Object, includes: string [] = []): Observable<Parse.Object> {
    return from(ob.fetchWithInclude(includes))

  }

  query(className) {
    return new Parse.Query(className)
  }


  count(query: Parse.Query): Observable<number> {
    return from(query.count()).pipe(catchError(err => {
      this.handleErrors(err)
      return throwError(err)
    }))
  }

  findWithCount(query: Parse.Query, limit?: number, skip?: number, withCount = true): Observable<DataWithCount> {

    if (Number.isInteger(limit)) {query.limit(limit)}
    if (Number.isInteger(skip)) {query.skip(skip)}

    const observables = [
      withCount ? this.count(query) : of(null),
      this.findByQuery(query, !Number.isInteger(limit))
    ]

    return forkJoin(observables).pipe(
      map(res => ({ count: res[ 0 ], data: res[ 1 ] })),
      // tap(res => console.log(res, query, limit, skip)),
      catchError(err => {
        this.handleErrors(err)
        return throwError(err)
      })
    )
  }

  handleErrors(err: Parse.Error) {
    if (err.code === 209) {
      this.logOut().then(() => this.router.navigate([ '/login' ]))
    }
  }


}


export interface DataWithCount {

  count: number
  data: Parse.Object[]
}

import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { ParseService } from '../services/parse.service'

@Injectable({
  providedIn: 'root'
})
export class LoginResolverService implements Resolve<any> {

  constructor(private parse: ParseService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (this.parse.isLogin()) {
      this.router.navigate([ '/sniffer-data' ])
    }
    return of(undefined)
  }
}

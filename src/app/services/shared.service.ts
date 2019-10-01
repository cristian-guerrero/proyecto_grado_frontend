import { Injectable, NgZone } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Router } from '@angular/router'
import { ParseService } from './parse.service'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private appOptionsSubject: BehaviorSubject<any>
  appOptionsObservable: Observable<any>

  appDefaultOptions: Partial<AppOptions> = {}


  constructor(private router: Router,
              private parse: ParseService,
              private ngZone: NgZone) {
    this.appOptionsSubject = new BehaviorSubject<any>(this.appDefaultOptions)
    this.appOptionsObservable = this.appOptionsSubject.asObservable()
  }

  set appLoading(value: boolean) {
    this.appDefaultOptions.loading = value
    this.appOptionsSubject.next(this.appOptionsSubject)
  }

  get appLoading(): boolean {
    return this.appDefaultOptions.loading
  }

  set appLoadingMode(value: string) {
    this.appDefaultOptions.loadingMode = value
    this.appOptionsSubject.next(this.appOptionsSubject)
  }

  get appLoadingMode(): string {
    return this.appDefaultOptions.loadingMode
  }

  // --------------------------------------------

  logOut() {
    this.parse.logOut().then(() => {
      this.ngZone.run(() => this.router.navigate([ '/login' ]))
    })
  }
}


export interface AppOptions {
  loading: boolean
  loadingMode: string
}

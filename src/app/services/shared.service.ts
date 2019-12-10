import { Injectable, NgZone } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Router } from '@angular/router'
import { ParseService } from './parse.service'
import { FormGroup } from '@angular/forms'

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
      this.router.navigate([ '/login' ])
    })
  }

  /**
   *
   * @param form
   */
  prepareObjectToUpdate(form: FormGroup): any {
    const dataToUpdate = {}
    for (const control in form.controls) {
      if (!form.controls[ control ].dirty) {continue}
      dataToUpdate[ control ] = form.controls[ control ].value
    }
    return dataToUpdate
  }
}


export interface AppOptions {
  loading: boolean
  loadingMode: string
}

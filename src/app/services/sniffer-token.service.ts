import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { SelectValueModel } from '../models/select-value-model'
import { SnifferClass } from '../models/sniffer-class'
import { debounceTime, map, mergeMap, tap } from 'rxjs/operators'
import { ParseService } from './parse.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { TokenClass } from '../models/token-class'

@Injectable({
  providedIn: 'root'
})
export class SnifferTokenService {

  constructor(private parse: ParseService,
              private fb: FormBuilder) { }


  /**
   *
   *
   */
  filterApplicationListCallback(value: string): Observable<SelectValueModel[]> {

    if (!value || value === '') {
      return of(null)
    }
    value = value.trim()
    const query = this.parse.query(SnifferClass.className)
    query.select(SnifferClass.NAME)
    query.matches(SnifferClass.NAME, new RegExp(value), null)

    return this.parse.findByQuery(query).pipe(
      map(res => {
        console.log(res)
        return res.map(x => {
          return {
            label: x.get(SnifferClass.NAME),
            value: x.get(SnifferClass.OBJECT_ID)
          }
        })
      })
    )
  }

  /**
   *
   */
  buildSnifferTokenForm(): FormGroup {
    return this.fb.group({
      [ TokenClass.SNIFFER ]: [ null, [ Validators.required ] ],
      [ TokenClass.EXPIRY ]: [ null, [] ],
    })
  }

}

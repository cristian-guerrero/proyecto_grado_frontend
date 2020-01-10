import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { SelectValueModel } from '../models/select-value-model'
import { SnifferClass } from '../models/sniffer-class'
import { debounceTime, map, mergeMap, tap } from 'rxjs/operators'
import { ParseService } from './parse.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { TokenClass } from '../models/token-class'
import { autocompleteValueModelValidator } from '../utli/validators/autocomplete-value-model.validator'
import { Consts } from '../utli'

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

    // console.log(value)
    if (!value || value === '') {
      return of(null)
    }
    value = value.trim()
    const query = this.parse.query(SnifferClass.className)
    query.select(SnifferClass.NAME)
    query.matches(SnifferClass.NAME, new RegExp(value), null)

    return this.parse.findByQuery(query).pipe(
      map(res => {
        // console.log(res)
        return res.map(x => {
          return {
            label: x.get(SnifferClass.NAME),
            value: x
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
      [ TokenClass.SNIFFER ]: [ null, [ Validators.required, autocompleteValueModelValidator ] ],
      [ TokenClass.EXPIRY ]: [ null, [ Validators.required ] ],
    })
  }

  create(from: FormGroup): Observable<Parse.Object> {

    const data = { ...from.value }
    data[ TokenClass.SNIFFER ] = data[ TokenClass.SNIFFER ].value
    data[ TokenClass.EXPIRY ] = data[ TokenClass.EXPIRY ].toDate()
    console.log(data)

    return this.parse.runCloudFunction(Consts.CLOUD_FUNCTION.CREATE_SNIFFER_TOKEN, {
      sniffer: data[ TokenClass.SNIFFER ].id,
      expiry: data[ TokenClass.EXPIRY ]
    })


    //  return this.parse.createObject(data, Consts.PUBLIC_ACL, TokenClass.className)

  }


}

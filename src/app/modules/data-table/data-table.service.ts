import { Injectable } from '@angular/core'
import { Consts } from '../../utli'
import { ParseService } from '../../services/parse.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(private parse: ParseService) { }


  getSchema(query: Parse.Query): Observable<any> {

   return  this.parse.runCloudFunction(Consts.CLOUD_FUNCTION.FILTER_COLUMNS,
      { className: query.className })
  }

}

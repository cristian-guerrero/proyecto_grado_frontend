import { Injectable } from '@angular/core'
import { Consts } from '../../utli'
import { ParseService } from '../../services/parse.service'
import { Observable, of } from 'rxjs'
import * as Parse from 'parse'
import * as moment from 'moment'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SnifferTokenFormComponent } from '../../views/sniffer-token/sniffer-token-form/sniffer-token-form.component'
import { DetailsComponent } from './details/details.component'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(private parse: ParseService,
              private bottonSheet: MatBottomSheet) { }


  getSchema(query: Parse.Query): Observable<any> {

    return this.parse.runCloudFunction(Consts.CLOUD_FUNCTION.FILTER_COLUMNS,
      { className: query.className })
  }


  deleteRow(row: Parse.Object): Observable<Parse.Object> {

    row.setACL(Consts.PRIVATE_ACL)
    return this.parse.updateObject(row, {})
  }

  updateRow(row: Parse.Object, data) {
    return this.parse.updateObject(row, data)
  }

  getRowDetails(row: Parse.Object): Observable<Parse.Object> {
    const q = this.parse.query(row.className)
    q.includeAll()
    q.equalTo('objectId', row.id)
    return this.parse.findFirstByQuery(q)

  }


  /**
   * Devuleve un string que sera mostrado en la tabla
   * Recibe un parse object y una clave de una propiedad de ese mismo parse object
   * Si la propiedad no existe en el parse object devuelve un string vacio
   * @param object
   * @param key
   */
  pipeData(object: Parse.Object, key: string) {


    let data: any

    if (key === 'objectId') {
      data = object.id
    } else if (object.has(key)) {
      data = object.get(key)
    } else {
      return ''
    }


    if (data instanceof Date) {
      return moment(data).format('YYYY-MM-DD')
    } else if (data instanceof Parse.Object) {
      return data.id
    }
    return this.trimString(data, 20)
  }

  r

  /**
   * convierte un objeto dado a string y corta el resultado en el tamaño dado
   * @param str
   * @param length
   */
  trimString(str: any, length: number) {

    const tmp = str.toString()
    if (tmp.length > length) {
      return tmp.substring(0, length) + '...'
    }
    return tmp
  }

  openDetailsModal(object: Parse.Object): Observable<any> {


    return this.getRowDetails(object).pipe(
      mergeMap(res => {
        return this.bottonSheet.open(DetailsComponent, {
          data: res,
          disableClose: true
        }).afterDismissed()
      })
    )
  }

  openConfirmDeleteDialog(object: Parse.Object, data: Parse.Object[]): Observable<Parse.Object[]> {
    return this.bottonSheet.open(ConfirmDialogComponent, {

      disableClose: false,
      data: '¿Desea eliminar el registro?'
    }).afterDismissed().pipe(
      mergeMap(res => {
        if (res) {
          return this.deleteRow(object)
        }
        return of(undefined)
      }),
      map(res => {
        if (res) {
          const temp = data.filter(x => x.id !== object.id)
          return temp
        }
        return undefined
      })
    )

  }
}










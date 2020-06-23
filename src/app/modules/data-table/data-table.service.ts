import { Injectable } from '@angular/core'
import { Consts } from '../../utli'
import { ParseService } from '../../services/parse.service'
import { Observable, of } from 'rxjs'
import * as Parse from 'parse'
import * as moment from 'moment'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { SnifferTokenFormComponent } from '../../views/sniffer-token/sniffer-token-form/sniffer-token-form.component'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { DataClass } from '../../models/data-class'
import { DataDetailClass } from '../../models/dataDetail-class'
import { COLUMNS_NAME } from './util'
import { ComponentType } from '@angular/cdk/overlay'
import { type } from 'os'
import { GenericClass } from '../../models/generic-class'
import { TokenClass } from '../../models/token-class'
import { LoadingAndNotifierService } from '../loading-and-notifier/loading-and-notifier.service'

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(private parse: ParseService,
              private bottonSheet: MatBottomSheet,
              private loadingService: LoadingAndNotifierService) { }


  /**
   * Busca el esquema de la colección en la base de datos
   * para generar dinamicamente los campos del filtro
   *
   * @param query
   */
  getSchema(query: Parse.Query): Observable<any> {

    return this.parse.runCloudFunction(Consts.CLOUD_FUNCTION.FILTER_COLUMNS,
      { className: query.className })
  }


  deleteRow(row: Parse.Object): Observable<Parse.Object> {

    row.setACL(Consts.PRIVATE_ACL)
    return this.parse.updateObject(row, { [ TokenClass.ACTIVE ]: false })
  }

  updateRow(row: Parse.Object, data) {
    return this.parse.updateObject(row, data)
  }

  getRowDetails(row: Parse.Object, className?: string, field?: string): Observable<Parse.Object[]> {
    let q: Parse.Query

    if (className && field) {
      q = this.parse.query(className)
      q.equalTo(field, row)

    } else {

      q = this.parse.query(row.className)
      q.equalTo('objectId', row.id)

    }

    q.limit(100)
    q.includeAll()
    return this.parse.findByQuery(q, false)

  }


  /**
   * Devuleve un string que sera mostrado en la tabla
   * Recibe un parse object y una clave de una propiedad de ese mismo parse object
   * Si la propiedad no existe en el parse object devuelve un string vacio
   * @param object
   * @param key
   * @param trim
   */
  pipeData(object: Parse.Object, key: string, trim = true) {


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
    } else if (typeof data === 'string') {
      // return data
    } else {
      const tmp = this.stringify(data)
      return trim ? this.trimString(tmp, 20) : tmp
    }


    return trim ? this.trimString(data, 20) : data

  }

  stringify(object: any): string {
    try {
      return JSON.stringify(object, undefined, 2)
    } catch (e) {

      console.log(e)
      return ''
    }
  }


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

  /**
   * Abre el modal de detalles de un registro
   * @param component
   * @param object
   */
  openDetailsModal<T>(component: ComponentType<T>, object: Parse.Object): Observable<any> {

    let observable: Observable<any>
    let parent = false

    this.loadingService.openLoadingComponent('Cargando detalles')

    if (object.className === DataClass.className) {
      parent = true
      console.log('open details modal with parent ')
      observable = this.getRowDetails(object, DataDetailClass.className, DataDetailClass.DATA)
    } else {
      observable = this.getRowDetails(object)
    }

    return observable.pipe(
      mergeMap(res => {
        return this.bottonSheet.open(component, {
          data: {
            objects: res,
            object: parent ? object : undefined
          },
          disableClose: false
        }).afterDismissed()
      })
    )
  }

  /**
   * Abre el modal de confirmación
   * @param object
   * @param data
   */
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

  /**
   * Imprime en consola cunado un campo del filtro no tiene su correspondiente
   * Nombre para mostrar en el campo del select
   *
   * @param field
   */
  getFieldName(field: string) {
    const names = COLUMNS_NAME

    if (!names.hasOwnProperty(field)) {
      console.error(` Se debe agregar el campo: ${ field }, en utils.ts en la constate COLUMNS_NAME`)
    }

    return names.hasOwnProperty(field) ? names[ field ] : field
  }
}





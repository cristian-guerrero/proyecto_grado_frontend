import { Component, Inject, OnInit } from '@angular/core'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { DialogDataInterface } from '../../../models/dialog-data.interface'
import { DataTableService } from '../data-table.service'
import { LoadingAndNotifierService } from '../../loading-and-notifier/loading-and-notifier.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: [ './details.component.scss' ]
})
export class DetailsComponent implements OnInit {


  parent: any
  objects: any[]

  constructor(private bottomSheetRef: MatBottomSheetRef<DetailsComponent, Parse.Object>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogDataInterface,
              private service: DataTableService,
              private loadingService: LoadingAndNotifierService
  ) {

    console.log(data)

    this.setComponentData(data)


  }

  ngOnInit() {
    this.loadingService.closeLoadingComponent()
  }


  cancel() {
    this.bottomSheetRef.dismiss(undefined)
  }


  thereIsParent() {
    return !!this.data.object
  }

  thereAreChildren() {
    return (this.thereIsParent() && this.objects) || (this.objects && this.objects.length > 1)
  }

  /**
   * todo extrar los datos para el parse object o la lista de parse objecte recibidos por parametros
   * Convertir los nombres de los campos a nombres como se hace en las cabeceras de las tablas
   */
  extractDataFromParseObject(object: Parse.Object, addId = false) {

    let data: any = {}
    if (addId) {
      data.objectId = object.id
    }

    data = { ...data, ...object.attributes }
    const temp = []

    for (const x in data) {
      if (!data.hasOwnProperty(x )) {continue}
      const tmpValue = data [ x ]
      temp.push({ label: this.service.getFieldName(x), value: this.service.pipeData(object, x, false) })
    }


    return temp

  }


  setComponentData(data: DialogDataInterface) {
    console.log(data)

    const tmpObjects = [ ...data.objects ]
    const parent = this.thereIsParent() ? data.object : tmpObjects.shift()


    /*
    tmpObjects.push(parent)
    tmpObjects.push(parent)
    tmpObjects.push(parent)
     */


    this.parent = this.extractDataFromParseObject(parent, true)
    this.objects = tmpObjects.map(x => this.extractDataFromParseObject(x, true))

    console.log(this.parent, this.objects)

  }
}

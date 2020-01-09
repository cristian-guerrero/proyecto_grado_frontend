import { ThemePalette } from '@angular/material/core'
import Table = WebAssembly.Table

export const COLUMNS_NAME = {


  objectId: 'Id',
  ip: 'IP',
  config: 'Configuración',
  updatedAt: 'Fecha de Actualización',
  createdAt: 'Fecha de Creación',
  name: 'Nombre',
  sniffer: 'Rastreador',
  protocol: 'Protocolo',
  port: 'Puerto',
  expiry: 'Fecha Expiración',
  hash: 'Hash',
  username: 'Nombre de Usuario',
  email: 'Correo Electrónico',
  active: 'Activo',
  createdBy: 'Creado por'

}


export  enum TableActionId {
  DETAILS,
  EDIT,
  DELETE
}


export const TABLE_ACTIONS: TableActionsModel [] = [
  {
    id: TableActionId.DETAILS,
    color: 'accent', tooltip: 'Detalles', active: true, icon: 'info',
  },
  {
    id: TableActionId.EDIT,
    color: 'primary', tooltip: 'Editar', active: true, icon: 'edit',
  },

  {
    id: TableActionId.DELETE,
    color: 'warn', tooltip: 'Eliminar', active: true, icon: 'delete',
  },


]



export class TableActionsModel {
  id: TableActionId
  color: ThemePalette
  tooltip: string
  active: boolean
  icon: string

}

export class TableCallbackContent {
  id: TableActionId
  object: Parse.Object


  constructor(id: TableActionId, object: Parse.Object) {
    this.id = id
    this.object = object
  }
}

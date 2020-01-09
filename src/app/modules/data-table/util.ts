import { ThemePalette } from '@angular/material/core'

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


export const TABLE_ACTIONS: TableActionsModel [] = [
  {
    id: 1,
    color: 'accent', tooltip: 'Detalles', active: true, icon: 'info',
  },
  {
    id: 2,
    color: 'primary', tooltip: 'Editar', active: true, icon: 'edit',
  },

  {
    id: 3,
    color: 'warn', tooltip: 'Eliminar', active: true, icon: 'delete',
  },


]



export class TableActionsModel {
  id: number
  color: ThemePalette
  tooltip: string
  active: boolean
  icon: string

}

export class ActionCallbackContent {
  id: number
  object: Parse.Object
}

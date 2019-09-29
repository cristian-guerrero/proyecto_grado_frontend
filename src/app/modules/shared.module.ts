import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
// import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import {  MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ParseService } from '../services/parse.service'
import { SharedService } from '../services/shared.service'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { NotifierService } from './notifier/notifier.service'
import { NotifierModule } from './notifier/notifier.module'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const ngForms = [ FormsModule, ReactiveFormsModule ]

const providers = [
  ParseService,
  SharedService,
]

const modules = [
  // FlexLayoutModule,
]

const materialModules = [
  MatFormFieldModule,
  MatIconModule,
  MatTooltipModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSnackBarModule

]

const declaration = []

@NgModule({
  declarations: [
    ...declaration
  ],
  imports: [
    CommonModule,
    ...modules,
    ...materialModules,
    ...ngForms,
    NotifierModule.forRoot()
  ],
  exports: [
    ...modules,
    ...materialModules,
    ...declaration,
    ...ngForms,
    NotifierModule
  ],
  providers: [
    ...providers
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ...providers ]
    }
  }
}

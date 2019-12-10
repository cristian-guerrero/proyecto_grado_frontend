import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ParseService } from '../services/parse.service'
import { SharedService } from '../services/shared.service'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
// import { NotifierService } from './notifier/notifier.service'
import { NotifierModule } from './notifier/notifier.module'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { AppToolbarComponent } from '../components/toolbar/app-toolbar.component'
import { RouterModule } from '@angular/router'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { DataTableModule } from './data-table/data-table.module'

const ngForms = [ FormsModule, ReactiveFormsModule ]

const providers = [
  ParseService,
  SharedService,
]

const modules = [
  FlexLayoutModule,
  RouterModule,
  DataTableModule,
]

const materialModules = [
  MatFormFieldModule,
  MatIconModule,
  MatTooltipModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatToolbarModule,

  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule,

]

const declaration = [
  AppToolbarComponent
]

@NgModule({
  declarations: [
    ...declaration
  ],
  imports: [
    CommonModule,
    ...modules,
    ...materialModules,
    ...ngForms,
    // NotifierModule.forRoot(),
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

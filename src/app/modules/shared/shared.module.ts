import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const ngForms = [ FormsModule, ReactiveFormsModule ]

const providers = []

const modules = [
  FlexLayoutModule,
]

const materialModules = []

const declaration = []

@NgModule({
  declarations: [
    ...declaration
  ],
  imports: [
    CommonModule,
    ...modules,
    ...materialModules,
    ...ngForms
  ],
  exports: [
    ...modules,
    ...materialModules,
    ...declaration,
    ...ngForms
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

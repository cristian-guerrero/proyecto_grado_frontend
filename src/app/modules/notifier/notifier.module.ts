import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotifierComponent } from './notifier.component'
import { NotifierService } from './notifier.service'
import { MatIconModule } from '@angular/material'

import { HttpClient } from '@angular/common/http'
import { MatSnackBarModule } from '@angular/material/snack-bar'


export function HttpLoaderFactory(http: HttpClient) {


}

@NgModule({
  declarations: [
    NotifierComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  entryComponents: [
    NotifierComponent,
  ],
  providers: [
    NotifierService
  ]
})
export class NotifierModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NotifierModule,
    }
  }
}

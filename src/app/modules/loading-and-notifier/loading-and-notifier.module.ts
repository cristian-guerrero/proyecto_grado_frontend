import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoadingComponent } from './loading/loading.component'
import { LoadingAndNotifierService } from './loading-and-notifier.service'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatSnackBarModule } from '@angular/material/snack-bar'


const providers = [
  LoadingAndNotifierService
]

const matModules = [
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
]

@NgModule({
  declarations: [ LoadingComponent ],
  entryComponents: [ LoadingComponent ],
  imports: [
    CommonModule,
    ...matModules,
    FlexLayoutModule,

  ],
  providers: [
    ...providers
  ]
})
export class LoadingAndNotifierModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoadingAndNotifierModule,
      providers: [ ...providers ]
    }
  }
}

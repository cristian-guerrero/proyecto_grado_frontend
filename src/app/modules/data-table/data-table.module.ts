import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DetailsComponent } from './details/details.component'
import { DataTableComponent } from './table/data-table.component'
import { DataTableService } from './data-table.service'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { FilterByColumComponent } from './filter-by-colum/filter-by-colum.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexModule } from '@angular/flex-layout'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY-MM',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY-MMMM',
  },
}


const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatBottomSheetModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatTooltipModule,
]
const ngForms = [ FormsModule, ReactiveFormsModule ]

@NgModule({
  declarations: [
    DetailsComponent,
    DataTableComponent,
    FilterByColumComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ...materialModules,
    ...ngForms,
    FlexModule,

  ],
  exports: [
    DataTableComponent
  ],
  providers: [
    DataTableService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS ]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  entryComponents: [
    DetailsComponent,
    ConfirmDialogComponent
  ]
})
export class DataTableModule {}

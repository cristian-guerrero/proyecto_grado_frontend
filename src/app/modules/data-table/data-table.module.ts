import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DetailsComponent } from './details/details.component'
import { DataTableComponent } from './table/data-table.component'
import { DataTableService } from './data-table.service'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { FilterByColumComponent } from './filter-by-colum/filter-by-colum.component'

const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatBottomSheetModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule,
]

@NgModule({
  declarations: [ DetailsComponent, DataTableComponent, FilterByColumComponent ],
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [
    DataTableComponent
  ],
  providers: [
    DataTableService
  ]
})
export class DataTableModule {}

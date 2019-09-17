import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatRippleModule,
  MatCheckboxModule,
  MatGridListModule,
  MatSortModule,
  MatCardModule,
  MatDividerModule

} from '@angular/material';

const material = [ MatButtonModule, MatToolbarModule, MatListModule, MatIconModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatSelectModule, MatPaginatorModule, MatDialogModule, MatTooltipModule,
  MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatSnackBarModule, MatRippleModule, MatCheckboxModule,
  MatSortModule, MatCardModule, MatDividerModule

];
@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }

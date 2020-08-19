import { NgModule } from '@angular/core';
import { HistoricEditDialogComponent } from './historic-edit-dialog.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HistoricEditDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [HistoricEditDialogComponent]
})
export class HistoricEditDialogModule {}

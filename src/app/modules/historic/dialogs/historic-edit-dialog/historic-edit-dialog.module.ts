import { NgModule } from '@angular/core';
import { HistoricEditDialogComponent } from './historic-edit-dialog.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DesignSystemModule } from '@shared/components/ds.module';

@NgModule({
  declarations: [HistoricEditDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    DesignSystemModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [HistoricEditDialogComponent]
})
export class HistoricEditDialogModule {}

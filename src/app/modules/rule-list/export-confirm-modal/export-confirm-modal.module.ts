import { NgModule } from '@angular/core';
import { ExportConfirmModalComponent } from './export-confirm-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ExportConfirmModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [ExportConfirmModalComponent]
})
export class ExportConfirmModalModule { }

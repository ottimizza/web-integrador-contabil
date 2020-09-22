import { NgModule } from '@angular/core';
import { ExportConfirmModalComponent } from './export-confirm-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

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

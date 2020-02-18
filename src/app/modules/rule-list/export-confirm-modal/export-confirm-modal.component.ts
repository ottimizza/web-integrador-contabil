import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Empresa } from '@shared/models/Empresa';

@Component({
  templateUrl: './export-confirm-modal.html'
})
export class ExportConfirmModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ExportConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empresa
  ) {}
}

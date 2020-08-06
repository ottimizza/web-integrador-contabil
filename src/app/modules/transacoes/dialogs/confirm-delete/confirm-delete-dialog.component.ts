import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Arquivo } from '@shared/models/Lancamento';
import { LancamentoService } from '@shared/services/lancamento.service';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent {

  isDeleting = false;

  constructor(
    public service: LancamentoService,
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Arquivo
  ) {}

  confirm() {
    this.isDeleting = true;
    this.service.inactivate(this.data.id)
      .pipe(finalize(() => this.isDeleting = false))
      .subscribe(() => {
        this.dialogRef.close('deleted');
      })
  }

}

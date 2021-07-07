import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';
import { LancamentoService } from '@shared/services/lancamento.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-call-accountant-dialog',
  templateUrl: './call-accountant-dialog.component.html',
  styleUrls: ['./call-accountant-dialog.component.scss']
})
export class CallAccountantDialogComponent implements OnInit {

  public isConfirming = false;

  constructor(
    public dialogRef: MatDialogRef<CallAccountantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lancamento,
    private service: LancamentoService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this.isConfirming = true;
    this.toast.showSnack('Questionando cliente...');
    this.service.question(this.data.id).subscribe((response: any) => {
      this.toast.show(response.message, 'success');
      this.dialogRef.close();
    });
  }

}

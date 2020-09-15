import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChecklistService } from '@app/http/checklist.service';
import { WorkflowService } from '@app/http/workflow.service';
import { ChecklistAnswer, ChecklistQuestion } from '@shared/models/Checklist';
import { Empresa } from '@shared/models/Empresa';
import { GenericResponse } from '@shared/models/GenericResponse';
import { LazyLoader } from '@shared/models/LazyLoader';
import { Script, ScriptStatus } from '@shared/models/Script';
import { ToastService } from '@shared/services/toast.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'script-project-confirmation',
  templateUrl: './project-confirmation.component.html'
})
export class ProjectConfirmationComponent implements OnInit {

  @Input() script: Script;
  @Input() company: Empresa;

  public data = new LazyLoader<GenericResponse<ChecklistAnswer & ChecklistQuestion>>();
  public name = new FormControl('', Validators.required);

  public isSaving = false;

  constructor(
    private workflowService: WorkflowService,
    private checklistService: ChecklistService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.script.nome) {
      this.name.setValue(this.script.nome);
      this.name.disable();
    } else {
      this.name.setValue(`${this.script.tipoRoteiro === 'REC' ? 'RECEBIMENTOS' : 'PAGAMENTOS'} - ${this.company.razaoSocial.toUpperCase()}`);
    }
    this.data.call(this.checklistService.getCompletedForm(2, this.script.id));
  }

  public confirm() {
    if (this.isSaving || this.name.invalid || this.script.nome) { return; }

    this.isSaving = true;
    this.toast.showSnack('Concluíndo projeto...');
    this.workflowService.patch(this.script.id, {
      status: ScriptStatus.PRE_ENTREGA,
      nome: this.name.value,
    }).pipe(catchError(err => {
      this.isSaving = false;
      throw err;
    })).subscribe(() => {
      this.toast.show('Parabéns, o projeto foi criado com sucesso e encaminhado para análise da Equipe Ottimizza', 'success').subscribe(() => {
        this.router.navigate(['/workflow']);
      });
    });
  }

}

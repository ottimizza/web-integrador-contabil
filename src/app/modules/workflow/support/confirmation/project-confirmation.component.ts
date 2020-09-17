import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChecklistService } from '@app/http/checklist.service';
import { WorkflowService } from '@app/http/workflow.service';
import { ChecklistAnswer, ChecklistInputType, ChecklistQuestion } from '@shared/models/Checklist';
import { Empresa } from '@shared/models/Empresa';
import { GenericResponse } from '@shared/models/GenericResponse';
import { LazyLoader } from '@shared/models/LazyLoader';
import { Script, ScriptStatus } from '@shared/models/Script';
import { ToastService } from '@shared/services/toast.service';
import { momentjs } from '@shared/utils/moment';
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
  public error: string;

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

  public checkAnswer(question: ChecklistQuestion & ChecklistAnswer): string {
    let value: string = question.resposta;
    const type = ChecklistInputType;

    switch (question.tipoInput) {
      case type.CHECKBOX:
        value = (`${value}` === 'true') ? 'Sim' : 'Não';
        break;
      case type.DATE:
        value = momentjs(value).format('DD/MM/YYYY');
        break;
      case type.SELECT:
        const index = question.opcoesResposta.map(or => or.valor).indexOf(value);
        value = question.opcoesResposta[index].descricao;
        break;
      case type.MULT_SELECT:
        const values = value.split(';').map(val => {
          const i = question.opcoesResposta.map(oq => oq.valor).indexOf(val);
          return question.opcoesResposta[i].descricao;
        });
        value = values.join(', ');
        break;
    }

    return value;
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
      if (`${err?.status}` === '400' || `${err?.statusCode}` === '400') {
        this.error = err.error.error_description;
        window.scrollTo(0, 0);
      }
      throw err;
    })).subscribe(() => {
      this.toast.show('Parabéns, o projeto foi criado com sucesso e encaminhado para análise da Equipe Ottimizza', 'success').subscribe(() => {
        this.router.navigate(['/workflow']);
      });
    });
  }

}

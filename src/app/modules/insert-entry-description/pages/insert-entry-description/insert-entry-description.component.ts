import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lancamento, TipoLancamento } from '@shared/models/Lancamento';
import { QuestionService } from '@shared/services/question.service';
import { momentjs } from '@shared/utils/moment';

@Component({
  selector: 'app-insert-entry-description',
  templateUrl: './insert-entry-description.component.html',
  styleUrls: ['./insert-entry-description.component.scss']
})
export class InsertEntryDescriptionComponent implements OnInit {

  public entry: Lancamento;
  public complements: string[] = [];
  public descricaoUsuario = '';
  public hasCompleted = false;

  private uuid: string;

  public type: 'pagamento' | 'recebimento' = 'pagamento';

  constructor(
    private routes: ActivatedRoute,
    private service: QuestionService
  ) { }

  ngOnInit(): void {
    this.uuid = this.routes.snapshot.params.uid;
    this.service.getLancamentoByUuid(this.uuid).subscribe(response => {
      this.entry = response.record;
      this.entry.dataMovimento = momentjs(this.entry.dataMovimento).format('DD/MM/YYYY');
      this.entry.valorOriginal = `R$ ${this.entry.valorOriginal.toFixed(2).toString().replace('.', ',')}` as any;
      this.push(this.entry.complemento01);
      this.push(this.entry.complemento02);
      this.push(this.entry.complemento03);
      this.push(this.entry.complemento04);
      this.push(this.entry.complemento05);
      if (this.entry.tipoLancamento === TipoLancamento.RECEBIMENTOS) {
        this.type = 'recebimento';
      }
    });
  }

  public push(value: string) {
    if (value) {
      this.complements.push(value);
    }
  }

  public confirm(event: any) {
    event.preventDefault();
    this.service.setNewComplement(this.uuid, this.descricaoUsuario).subscribe(() => {
      this.hasCompleted = true;
    });
  }

}

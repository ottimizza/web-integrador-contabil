import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';
import { Historic } from '@shared/models/Historic';

@Component({
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  fields: any[];
  lancamento: Lancamento;
  historicObj: Historic;

  constructor(
    public dialogRef: MatDialogRef<HistoricComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // Define os labels dos campos que serão exibidos
    this.fields = [
      { span: 'Comentário Inicial', name: 'Campo 1:' },
      { span: 'Comentário 2', name: 'Campo 2:' },
      { span: 'Comentário 3', name: 'Campo 3:' },
      { span: 'Comentário 4' }
    ];
    this.historicObj = new Historic();
    this.lancamento = this.data.lancamento;
  }

  onChange(event: any, i: number): void {
    // this.historicObj.campos[i].field = this.dePara(event);
    // this.historicObj.campos[i].value = this.getValues(event);

    if (i === 0) {
      this.historicObj.field1.value = this.getValues(event);
      this.historicObj.field1.field = this.dePara(event);
    } else if (i === 1) {
      this.historicObj.field2.value = this.getValues(event);
      this.historicObj.field2.field = this.dePara(event);
    } else if (i === 2) {
      this.historicObj.field3.value = this.getValues(event);
      this.historicObj.field3.field = this.dePara(event);
    }
    this._update();
  }

  onKeyup(event: any, i: number): void {
    if (i === 0) {
      this.historicObj.com1 = event;
    } else if (i === 1) {
      this.historicObj.com2 = event;
    } else if (i === 2) {
      this.historicObj.com3 = event;
    } else if (i === 3) {
      this.historicObj.com4 = event;
    }
    this._update();

  }

  onNoClick() {
    this.dialogRef.close();
  }

  date(): string {
    const dates = this.lancamento.dataMovimento;
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }

  get params(): string {
    return this.historicObj.preview;
  }

  private _update(): void {
    const l = this.lancamento;
    this.data.regra = this.historicObj.historic(l.contaMovimento, l.cnpjEmpresa, l.cnpjContabilidade);
  }

  private getValues(combo: string): string {
    const l = this.lancamento;
    const results = [
      l.descricao,
      l.portador,
      this.date(),
      l.valorOriginal ? `${l.valorOriginal}` : null,
      l.documento,
      l.nomeArquivo,
      l.tipoPlanilha,
      l.complemento01,
      l.complemento02,
      l.complemento03,
      l.complemento04,
      l.complemento05
    ];
    return this.ifChainPattern(results, combo);
  }

  private dePara(property: string): string {
    const results = [
      'descricao',
      'portador',
      'dataMovimento',
      'valorOriginal',
      'documento',
      'nomeArquivo',
      'tipoPlanilha',
      'complemento01',
      'complemento02',
      'complemento03',
      'complemento04',
      'complemento05'
    ];

    return this.ifChainPattern(results, property);
  }

  private ifChainPattern(results: string[], property: string): string {
      if (property === 'Fornecedor') {
        return results[0];
      } else if (property === 'Portador') {
        return results[1];
      } else if (property === 'Data') {
        return results[2];
      } else if (property === 'Valor') {
        return results[3];
      } else if (property === 'Documento') {
        return results[4];
      } else if (property === 'Nome do Arquivo') {
        return results[5];
      } else if (property === 'Tipo da Planilha') {
        return results[6];
      } else if (property === 'Complemento 01') {
        return results[7];
      } else if (property === 'Complemento 02') {
        return results[8];
      } else if (property === 'Complemento 03') {
        return results[9];
      } else if (property === 'Complemento 04') {
        return results[10];
      } else if (property === 'Complemento 05') {
        return results[11];
      } else {
        return '';
      }
  }

  decode() {
    const lancamento = {
      id: '',
      complemento01: 'FOLHA DE PAGAMENTO',
      documento: '4523'
    };

    const historico = '${r2 323} Texto ${complemento01} ${documento}';

    const format = (texto, lanc) => {
      const regex = /\${(?<=(\${))[a-zA-Z0-9]+(?=})}/g;
      const formatado = texto.replace(regex, (match) => {
        // remove '${' (inicio) e '}' (fim).
        const m = match.replace(/\${((?<=(\${))[a-zA-Z0-9]+(?=}))}/g, '$1');
        // devolve o valor substituto, caso exista ou não troca a variavel.
        return (typeof lanc[m] !== typeof undefined) ? lanc[m] : match;
      });
      return formatado;
    };

    // const reg1 = /\${(?<=(\${))[a-zA-Z0-9]+(?=})}/g;
    // const reg2 = /\${((?<=(\${))[a-zA-Z0-9]+(?=}))}/g;

    console.log(historico);
    console.log(format(historico, lancamento));
  }

}

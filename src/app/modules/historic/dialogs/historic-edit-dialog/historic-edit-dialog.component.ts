import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormattedHistoric, Historic } from '@shared/models/Historic';
import { HistoricService } from '@shared/services/historic.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EntryUtils } from '@shared/utils/entry.utils';
import { FormUtils } from '@shared/utils/form.utils';
import { Lancamento } from '@shared/models/Lancamento';

export class HistoricEditDialogData {
  type: 'post' | 'edit';
  reference: FormattedHistoric;
  entry?: Lancamento;
}

@Component({
  templateUrl: './historic-edit-dialog.component.html',
  styleUrls: ['./historic-edit-dialog.component.scss']
})
export class HistoricEditDialogComponent implements OnInit {

  public historic = new Historic();
  public isPosting = false;

  public form = FormUtils.groupBuilder([
    'code',
    'historicText1',
    'historicText2',
    'historicText3',
    'historicText4',
    'historicField1',
    'historicField2',
    'historicField3',
  ]);

  public details = [
    { label1: 'Texto Inicial', label2: 'Campo 1', id1: 'historicText1', id2: 'historicField1', ex: 'Ex. Despesas bancárias' },
    { label1: 'Texto 2', label2: 'Campo 2', id1: 'historicText2', id2: 'historicField2', ex: 'Ex. Pagamento referente à' },
    { label1: 'Texto 3', label2: 'Campo 3', id1: 'historicText3', id2: 'historicField3', ex: 'Ex. Cheque emitido' },
    { label1: 'Texto 4', id1: 'historicText4', ex: 'Ex. Repasse' }
  ];

  public options = [
    'nenhum',
    'descricao',
    'portador',
    'competencia',
    'competenciaAnterior',
    'documento',
    'complemento01',
    'complemento02',
    'complemento03',
    'complemento04',
    'complemento05'
  ];

  constructor(
    public dialogRef: MatDialogRef<HistoricEditDialogComponent>,
    public service: HistoricService,
    @Inject(MAT_DIALOG_DATA) public data: HistoricEditDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.type === 'edit') {
      this.historic = Historic.parse(this.data.reference.historico);
      this.form.get('code').setValue(this.historic.id || '');
      this.form.get('historicText1').setValue(this.historic.com1 || '');
      this.form.get('historicText2').setValue(this.historic.com2 || '');
      this.form.get('historicText3').setValue(this.historic.com3 || '');
      this.form.get('historicText4').setValue(this.historic.com4 || '');
      this.form.get('historicField1').setValue(this.historic.field1.field || 'nenhum');
      this.form.get('historicField2').setValue(this.historic.field2.field || 'nenhum');
      this.form.get('historicField3').setValue(this.historic.field3.field || 'nenhum');
    }
  }

  public parse(data: HistoricEditDialogData) {
    const reference = { tipoLancamento: data.reference.tipoLancamento };
    if (data.entry) {
      const entry = data.entry;
      Object.assign(reference, { labelComplemento01: entry.arquivo.labelComplemento01 });
      Object.assign(reference, { labelComplemento02: entry.arquivo.labelComplemento02 });
      Object.assign(reference, { labelComplemento03: entry.arquivo.labelComplemento03 });
      Object.assign(reference, { labelComplemento04: entry.arquivo.labelComplemento04 });
      Object.assign(reference, { labelComplemento05: entry.arquivo.labelComplemento05 });
    }
    return (option: string) => EntryUtils.fromTo(option, reference).replace('*', '');
  }

  public update() {
    const get = (formControl: string) => this.form.get(formControl).value;

    this.historic.id = get('code');
    this.historic.com1 = get('historicText1');
    this.historic.com2 = get('historicText2');
    this.historic.com3 = get('historicText3');
    this.historic.com4 = get('historicText4');
    this.historic.field1.field = get('historicField1');
    this.historic.field2.field = get('historicField2');
    this.historic.field3.field = get('historicField3');

    if (this.data.entry) {
      this.historic.field1.value = this.data.entry[get('historicField1')];
      this.historic.field2.value = this.data.entry[get('historicField2')];
      this.historic.field3.value = this.data.entry[get('historicField3')];
    }
  }

  public get label() {
    return this.data.type === 'post' ? 'Salvar' : 'Alterar';
  }

  public getPreview() {
    let preview = this.historic.preview;
    if (this.historic.id) {
      preview = `Código: ${this.historic.id}. ${preview}`;
    }
    return preview;
  }

  public submit() {
    this.isPosting = true;

    const historic = this.historic.historic(
      this.data.reference.contaMovimento,
      this.data.reference.cnpjEmpresa,
      this.data.reference.cnpjContabilidade,
      this.data.reference.tipoLancamento,
      this.data.reference.idRoteiro
    );

    if (this.data.type === 'edit') {
      historic.id = this.data.reference.id;
    }

    const obs$ = this.data.type === 'post' ?
      this.service.createHistoric(historic) :
      this.service.update(historic);

    obs$.subscribe(result => {
      this.dialogRef.close(result);
    });

  }

}

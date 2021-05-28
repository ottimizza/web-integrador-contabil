import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileStorageService } from '@app/http/file-storage.service';
import { StandardLayoutService } from '@app/http/standard-layout.service';
import { Layout, LayoutIntegrationType } from '@shared/models/Layout';
import { ToastService } from '@shared/services/toast.service';
import { ArrayUtils } from '@shared/utils/array.utils';
import { StringUtils } from '@shared/utils/string.utils';
import { finalize, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-integration-create-dialog',
  templateUrl: './integration-create-dialog.component.html',
  styleUrls: ['./integration-create-dialog.component.scss']
})
export class IntegrationCreateDialogComponent implements OnInit {

  constructor(
    private service: StandardLayoutService,
    private uploadService: FileStorageService,
    private toast: ToastService,
    public dialogRef: MatDialogRef<IntegrationCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public originalValue?: Layout,
  ) { }

  public searchTerms = '';
  public isSaving = false;

  public descricaoDocumento = '';
  public tipoIntegracao: LayoutIntegrationType = LayoutIntegrationType.EXTRATOS;
  public pagamentos = false;
  public recebimentos = false;
  public tags: string[] = []
  public linkReferencia: string;
  public tipoArquivo: string;
  public icone: string;
  public idSalesForce: string;

  ngOnInit(): void {
    if (this.originalValue) {
      this.descricaoDocumento = this.originalValue.descricaoDocumento;
      this.tipoIntegracao =     this.originalValue.tipoIntegracao;
      this.pagamentos =         this.originalValue.pagamentos;
      this.recebimentos =       this.originalValue.recebimentos;
      this.tags =               this.originalValue.tags || [];
      this.linkReferencia =     this.originalValue.linkReferencia;
      this.tipoArquivo =        this.originalValue.tipoArquivo;
      this.icone =              this.originalValue.icone;
      this.idSalesForce =       this.originalValue.idSalesForce;
    }
  }

  public addTag() {
    const tags = ArrayUtils.split(this.searchTerms, ' ', ',', ';');
    this.tags = ArrayUtils.preventRepeat(this.tags.concat(tags)).map(tag => StringUtils.normalize(tag).toLowerCase());
    this.searchTerms = '';
  }

  public removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  public uploadFile(event: File) {
    const params = event.name.split('.');
    this.toast.showSnack('Enviando arquivo...');
    this.uploadService.store(event)
    .subscribe(result => {
      this.linkReferencia = this.uploadService.getResourceURL(result.record.id);
      console.log(this.linkReferencia);
      this.tipoArquivo = params[params.length - 1];
      this.toast.show('Arquivo enviado com sucesso!', 'success');
    });
  }

  public uploadLogo(event: File) {
    this.toast.showSnack('Enviando ícone...');
    this.uploadService.store(event)
    .subscribe(result => {
      this.icone = this.uploadService.getResourceURL(result.record.id);
      this.toast.show('Ícone enviada com sucesso!', 'success');
    });
  }

  public confirm() {
    if (!this.descricaoDocumento) {
      this.toast.show('Informe uma descrição!', 'warning');
      return;
    }
    if (!this.tipoIntegracao) {
      this.toast.show('Informe um tipo!', 'warning');
      return;
    }
    if (!this.tags?.length) {
      this.toast.show('Informe ao menos uma palavra-chave!', 'warning');
      return;
    }
    if (!this.linkReferencia || !this.tipoArquivo) {
      this.toast.show('Informe um arquivo!', 'warning');
      return;
    }
    if (!this.icone) {
      this.toast.show('Informe um ícone!', 'warning');
      return;
    }
    if (!this.idSalesForce) {
      this.toast.show('Informe uma Referência Salesforce!', 'warning');
      return;
    }

    const layout = this.originalValue || new Layout();
    layout.descricaoDocumento = this.descricaoDocumento;
    layout.tipoIntegracao = this.tipoIntegracao;
    layout.tags = this.tags;
    layout.linkReferencia = this.linkReferencia;
    layout.tipoArquivo = this.tipoArquivo;
    layout.icone = this.icone;
    layout.idSalesForce = this.idSalesForce;

    console.log(this.linkReferencia, layout.linkReferencia);

    this.toast.showSnack('Salvando...');
    this.isSaving = true;

    if (this.originalValue?.id) {
      this.service.update(this.originalValue.id, layout)
        .pipe(finalize(() => this.isSaving = false))
        .subscribe(() => {
          this.toast.show('Alterado com sucesso!', 'success');
          this.dialogRef.close();
        });
    } else {
      this.service.create(layout)
        .pipe(finalize(() => this.isSaving = false))
        .subscribe(() => {
          this.toast.show('Criado com sucesso!', 'success');
          this.dialogRef.close();
        });
    }
  }

  public delete() {
    this.toast.showSnack('Excluindo...');
    this.service.delete(this.originalValue.id).subscribe(() => {
      this.toast.show('Excluído com sucesso!', 'success');
      this.dialogRef.close();
    });
  }

}

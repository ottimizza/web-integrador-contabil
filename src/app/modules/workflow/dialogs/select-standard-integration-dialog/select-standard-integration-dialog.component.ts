import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StandardLayoutService } from '@app/http/standard-layout.service';
import { WorkflowService } from '@app/http/workflow.service';
import { Empresa } from '@shared/models/Empresa';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { Layout, LayoutIntegrationType } from '@shared/models/Layout';
import { Script } from '@shared/models/Script';
import { ToastService } from '@shared/services/toast.service';
import { ArrayUtils } from '@shared/utils/array.utils';
import { StringUtils } from '@shared/utils/string.utils';
import { forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-select-standard-integration-dialog',
  templateUrl: './select-standard-integration-dialog.component.html',
  styleUrls: ['./select-standard-integration-dialog.component.scss']
})
export class SelectStandardIntegrationDialogComponent implements OnInit {

  public searchTerms = '';
  public tags: string[] = [];

  public erps: Layout[] = [];
  public cards: Layout[] = [];
  public extracts: Layout[] = [];

  public integrations = [];
  public custom = false;
  public omc = false;
  public selecteds: Layout[] = [];
  public selectedIds: number[] = [];

  public isConfirming = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public company: Empresa,
    public dialogRef: MatDialogRef<SelectStandardIntegrationDialogComponent>,
    private slService: StandardLayoutService,
    private wfService: WorkflowService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  public addTag() {
    const tags = ArrayUtils.split(this.searchTerms, ' ', ',', ';');
    this.tags = ArrayUtils.preventRepeat(this.tags.concat(tags)).map(tag => StringUtils.normalize(tag).toLowerCase());
    this.searchTerms = '';
    this.fetch();
  }

  public remove(index: number) {
    this.tags.splice(index, 1);
    this.fetch();
  }

  public async fetch() {
    let pageInfo = new PageInfo({ pageIndex: -1, hasNext: true, pageSize: 20 });
    this.selecteds = [];
    this.selectedIds = [];
    this.toast.showSnack('Buscando...');

    this.erps = [];
    this.cards = [];
    this.extracts = [];

    while (pageInfo.hasNext) {
      pageInfo.pageIndex++;
      const rs = await this.slService.fetch(Object.assign(pageInfo, { palavras_chave: this.tags.join(',') })).toPromise();
      pageInfo = rs.pageInfo;

      const records = rs.records.map(result => {
        result.icone = result.icone || 'https://ottimizza.com.br/wp-content/themes/ottimizza/images/logo.png';
        // if (result.tipoArquivo === 'csv') {
        //   result.extentionIcon = 'file-csv';
        // } else if (result.tipoArquivo === 'xlsx') {
        //   result.extentionIcon = 'file-excel';
        // } else if (result.tipoArquivo === 'pdf') {
        //   result.extentionIcon = 'file-pdf';
        // } else if (result)
        switch (result.tipoArquivo) {
          case 'csv':
            result.extentionIcon = 'fa-file-csv';
            break;
          case 'xlsx':
            result.extentionIcon = 'fa-file-excel';
            break;
          case 'pdf':
            result.extentionIcon = 'fa-file-pdf';
            break;
          case 'txt':
            result.extentionIcon = 'fa-file-alt';
            break;
          default:
            result.extentionIcon = 'fa-file-exclamation';
        }
        return result;
      });

      this.erps = this.erps.concat(records.filter(result => result.tipoIntegracao === LayoutIntegrationType.ERPS));
      this.cards = this.cards.concat(records.filter(result => result.tipoIntegracao === LayoutIntegrationType.CARTOES));
      this.extracts = this.extracts.concat(records.filter(result => result.tipoIntegracao === LayoutIntegrationType.EXTRATOS));
    }

    this.toast.hideSnack();
  }

  public select(event: Layout) {
    const index = this.selecteds.map(lay => lay.id).indexOf(event.id);
    if (index < 0) {
      this.selecteds.push(event);
      this.selectedIds.push(event.id);
    } else {
      this.selecteds.splice(index, 1);
      this.selectedIds.splice(index, 1);
    }
  }

  public confirm() {
    if (!this.selecteds?.length && !this.omc) {
      this.dialogRef.close(this.custom);
      return;
    }
    this.isConfirming = true;
    this.toast.showSnack('Preparando ambiente, isto pode demorar um pouco...');
    // const scripts = this.selecteds.map(() => Script.firstPart(this.company));
    // const observables$ = scripts.map((script, index) => {
    //   return this.wfService.start(script)
    //   .pipe(switchMap(result => this.slService.layoutToScript(result.record.id, this.selecteds[index])));
    // });
    // forkJoin(observables$)
    const script = Script.firstPart(this.company);
    script.tipoRoteiro = 'PAG;REC' as any;
    script.utilizaOMC = this.omc;

    this.wfService.setLayouts(script, this.selecteds || [])
    .pipe(finalize(() => this.isConfirming = false))
    .subscribe(() => {
      this.toast.hideSnack();
      this.dialogRef.close(this.custom);
    });
  }

  public download(layout: Layout) {
    window.open(`${layout.linkReferencia}/download`, '_blank');
  }

}

import { Component, OnInit } from '@angular/core';
import { StandardLayoutService } from '@app/http/standard-layout.service';
import { DialogService, DialogWidth } from '@app/services/dialog.service';
import { ActionButton } from '@shared/components/action-buttons/action-buttons.component';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { Layout } from '@shared/models/Layout';
import { ArrayUtils } from '@shared/utils/array.utils';
import { StringUtils } from '@shared/utils/string.utils';
import { IntegrationCreateDialogComponent } from './dialogs/integration-create-dialog/integration-create-dialog.component';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss']
})
export class IntegrationsComponent implements OnInit {

  constructor(
    private service: StandardLayoutService,
    private dialog: DialogService
  ) { }

  public width = window.document.body.clientWidth / 15;
  public buttons: ActionButton[] = [{
    icon: 'fad fa-plus-square',
    id: 'create',
    label: 'NOVO PADRÃO',
    color: 'btn-primary',
  }];

  public layouts: Layout[];
  public searchTerms = '';
  public tags: string[] = [];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.layouts = [];
    let pageInfo = new PageInfo({ hasNext: true, pageIndex: -1 });

    while (pageInfo.hasNext) {
      const filter = {
        pageIndex: pageInfo.pageIndex + 1,
        pageSize: 20,
        palavras_chave: this.tags.join(',')
      };

      const resultSet = await this.service.fetch(filter).toPromise();
      pageInfo = resultSet.pageInfo;
      this.layouts = this.layouts.concat(resultSet.records);
    }
  }

  public addTag() {
    const tags = ArrayUtils.split(this.searchTerms, ' ', ',', ';');
    this.tags = ArrayUtils.preventRepeat(this.tags.concat(tags)).map(tag => StringUtils.normalize(tag).toLowerCase());
    this.searchTerms = '';
  }

  public remove(index: number) {
    this.tags.splice(index, 1);
  }

  public create() {
    this.dialog.open(IntegrationCreateDialogComponent)
    .subscribe(() => {
      this.fetch();
    });
  }

  public edit(layout: Layout) {
    this.dialog.openComplexDialog(IntegrationCreateDialogComponent, DialogWidth.DEFAULT, layout)
    .subscribe(() => {
      this.fetch();
    });
  }

}

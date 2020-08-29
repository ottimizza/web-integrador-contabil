import { Component, OnInit } from '@angular/core';
import { Organization } from '@shared/models/Organization';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { MatDialogRef, PageEvent } from '@angular/material';
import { StorageService } from '@app/services/storage.service';
import { OrganizationService } from '@app/http/organizations.service';
import { UserService } from '@app/http/users.service';
import { ToastService } from '@shared/services/toast.service';
import { User } from '@shared/models/User';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { AuthenticationService } from '@app/authentication/authentication.service';

@Component({
  templateUrl: './signin-as-dialog.component.html',
  styleUrls: ['./signin-as-dialog.component.scss']
})
export class SigninAsDialogComponent implements OnInit {

  currentAccounting: Organization;
  accountings: Organization[] = [];
  filters: SearchOption[] = [];
  pageInfo = new PageInfo({ hasNext: true, pageIndex: 0, pageSize: 10 });
  dataSource: Organization[] = [];
  displayedColumns = ['name', 'cnpj'];
  selectedRowIndex = -1;

  defaultRule = SearchRule.builder()
    .id('default')
    .value({ name: '' })
    .description('Nome contém: "{0}"')
    .build();

  constructor(
    public dialogRef: MatDialogRef<SigninAsDialogComponent>,
    public organizationService: OrganizationService,
    public storageService: StorageService,
    public toastService: ToastService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentAccounting = User.fromLocalStorage().organization;
    this.fetch(0, 5);
  }

  getContent(accounting: Organization) {
    return `${accounting.cnpj} - ${accounting.name}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPageChange(event: PageEvent): void {
    this.fetch(event.pageIndex, event.pageSize);
  }

  hackings() {
    return [
      HackingRule.builder()
        .id('name')
        .value({ name: '' })
        .regex(/(nome)\:\s(?<value>.+)/ig)
        .description('Nome contém: "{0}"')
        .build(),
      HackingRule.builder()
        .id('cnpj')
        .value({ cnpj: '' })
        .regex(/(cnpj)\:\s(?<value>.+)/ig)
        .description('CNPJ igual a: {0}')
        .build()
    ];
  }

  apply(event: SearchOption) {
    const filters = this.filters.filter(fil => fil.id === event.id);
    if (filters.length > 0) {
      this.filters.splice(this.filters.indexOf(filters[0]), 1);
    }
    this.filters.push(event);
    this.fetch();
  }

  public removeFilter(value: any): void {
    const filter = this.filters.filter(el => el.id === value.id);
    if (filter.length > 0) {
      this.filters.splice(this.filters.indexOf(filter[0]), 1);
    }
    this.fetch();
  }

  fetch(pageIndex = 0, pageSize = 5) {
    let filter = { type: Organization.Type.ACCOUNTING, ignoreAccountingFilter: true, active: true };
    this.filters.forEach(value => filter = Object.assign(filter, value.value));
    const searchCriteria = Object.assign({ pageIndex, pageSize }, filter);

    this.organizationService.fetch(searchCriteria)
      .subscribe(response => {
        this.accountings = response.records;
        this.pageInfo = response.pageInfo;
        this.dataSource = this.accountings;
      });
  }

  select(accounting: Organization) {
    this.currentAccounting = accounting;
  }

  confirm() {
    this.userService
      .patch(User.fromLocalStorage().id, { organization: this.currentAccounting })
      .subscribe(result => {
        const user = User.fromLocalStorage();
        user.organization = this.currentAccounting;
        this.storageService.store(AuthenticationService.STORAGE_KEY_USERINFO, JSON.stringify(user));
        this.toastService.show(`Contabilidade ${this.currentAccounting.name} selecionada`);
        this.dialogRef.close(this.currentAccounting);
      });
  }

}

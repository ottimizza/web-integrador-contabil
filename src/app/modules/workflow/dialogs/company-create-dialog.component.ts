import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from '@app/http/organizations.service';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { ToastService } from '@shared/services/toast.service';
import { CNPJUtils } from '@shared/utils/docs.utils';
import { Empresa } from '@shared/models/Empresa';
import { BusinessService } from '@shared/services/business.service';

@Component({
  templateUrl: './company-create-dialog.component.html'
})
export class CompanyCreateDialogComponent {

  errorText: string;
  isCreating = false;
  firstStep = true;

  form = new FormGroup({
    cnpj: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    erp: new FormControl('', Validators.required),
    nick: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])
  });

  constructor(
    public dialogRef: MatDialogRef<CompanyCreateDialogComponent>,
    public organizationService: OrganizationService,
    public companyService: BusinessService,
    public toast: ToastService
  ) {}

  get erp()  { return this.form.get('erp'); }
  get cnpj() { return this.form.get('cnpj'); }
  get name() { return this.form.get('name'); }
  get nick() { return this.form.get('nick'); }

  import() {
    if (this.cnpj.invalid) {
      this.errorText = 'CPF ou CNPJ é obrigatório';
    } else {
      this.toast.showSnack('Analisando registros anteriores...');
      const filter = { cnpj: this.cnpj.value, type: 2, organizationId: User.fromLocalStorage().organization.id, active: true };
      this.organizationService.fetch(filter).subscribe(rs => {
        this.toast.hideSnack();
        this.buildOrganization(rs.records[0]);
      });
    }
  }

  buildOrganization(company: Organization) {
    if (company?.cnpj) {
      this.cnpj.setValue(CNPJUtils.applyMask(company.cnpj));
      this.cnpj.disable();
    }
    if (company?.name) {
      this.name.setValue(company.name);
      this.name.disable();
    }
    if (company?.codigoERP) {
      this.erp.setValue(company.codigoERP);
      this.erp.disable();
    }
    this.firstStep = false;
  }

  save() {
    if (this.cnpj.invalid) {
      this.errorText = 'CPF ou CNPJ é obrigatório!';
    } else if (this.name.invalid) {
      this.errorText = 'Nome é obrigatório!';
    } else if (this.erp.invalid) {
      this.errorText = 'Código ERP é obrigatório!';
    } else if (this.nick.invalid) {
      const errors = this.nick.errors;
      if (errors.required) {
        this.errorText = 'Apelido é obrigatório!';
      } else if (errors.maxlength) {
        this.errorText = 'Apelido é muito grande!';
      } else if (errors.pattern) {
        this.errorText = 'Apelido não pode conter números ou caracteres especiais!';
      }
    } else {
      this.errorText = '';
      this._save();
    }
  }

  private _save() {
    this.isCreating = true;

    const nomeResumido = (this.nick.value as string)
      .replace(/ /g, '_')
      .toLowerCase()
      .split('');
    nomeResumido[0] = nomeResumido[0].toUpperCase();

    const company = new Empresa();
    company.cnpj = CNPJUtils.cleanMask(this.cnpj.value);
    company.nomeResumido = nomeResumido.join('');
    company.razaoSocial = this.name.value;
    company.codigoERP = this.erp.value;
    company.accountingId = User.fromLocalStorage().organization.id;
    company.nomeCompleto = `${company.codigoERP} - ${company.razaoSocial}`;

    this.toast.showSnack('Criando empresa, aguarde alguns instantes...');
    this.companyService.create(company).subscribe(() => {
      this.toast.show('Parabéns, empresa criada com sucesso!', 'success');
      this.dialogRef.close('organization-created');
    }, err => {
      this.isCreating = false;
      if (!err?.error?.error_description?.startsWith('{')) {
        this.errorText = err.error.error_description;
      }
    });
  }

}

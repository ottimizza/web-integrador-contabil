import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from '@app/http/organizations.service';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { ToastService } from '@shared/services/toast.service';

@Component({
  templateUrl: './company-create-dialog.component.html'
})
export class CompanyCreateDialogComponent {

  errorText: string;
  isCreating = false;

  form = new FormGroup({
    cnpj: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    erp: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<CompanyCreateDialogComponent>,
    public service: OrganizationService,
    public toast: ToastService
  ) {}

  save() {
    if (!this.form.get('cnpj').valid) {
      this.errorText = 'CPF ou CNPJ é obrigatório!';
    } else if (!this.form.get('name').valid) {
      this.errorText = 'Nome é obrigatório!';
    } else if (!this.form.get('erp').valid) {
      this.errorText = 'Código ERP é obrigatório!';
    } else {
      this._save();
    }
  }

  private _save() {
    this.isCreating = true;

    const organization = new Organization();
    organization.cnpj = this.form.get('cnpj').value;
    organization.codigoERP = this.form.get('erp').value || '';
    organization.name = this.form.get('name').value.toUpperCase();
    organization.organizationId = User.fromLocalStorage().organization.id;
    organization.type = Organization.Type.CUSTOMER;
    organization.active = true;

    this.service.create(organization).subscribe(() => {
      this.toast.show('Parabéns, empresa criada com sucesso!', 'success');
      this.dialogRef.close('organization-created');
    }, err => {
      this.isCreating = false;
      this.errorText = err?.error?.error_description;
    });
  }

}

export class Organization {

  static Type = class {
    static ACCOUNTING = 1;
    static CUSTOMER = 2;
  };

  id: number;
  organizationId: number;

  cnpj: string;
  externalId: boolean;
  type: number;
  active: boolean;

  name: string;
  codigoERP: string;
  avatar: string;
  email: string;

}

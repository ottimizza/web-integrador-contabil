import { Integration } from './Integration';
import { Organization } from './Organization';
import { User } from './User';

export class Script {

  public id: number;
  public status: number;
  public dataCriacao: any;
  public dataAtualizacao: any;

  public nome: string;
  public urlArquivo: string;
  public empresaId: number;
  public cnpjEmpresa: string;
  public contabilidadeId: number;
  public cnpjContabilidade: string;
  public tipoRoteiro: 'PAG' | 'REC';
  public mapeamento: Integration;

  public static firstPart(company: Organization, type: 'PAG' | 'REC') {
    const script = new Script();
    const currentAccounting = User.fromLocalStorage().organization;

    script.empresaId = company.id;
    script.cnpjEmpresa = company.cnpj;
    script.contabilidadeId = currentAccounting.id;
    script.cnpjContabilidade = currentAccounting.cnpj;
    script.tipoRoteiro = type;

    return script;
  }

  public static secondPart(file: string, name: string, completeMapping: Integration) {
    const script = new Script();

    script.urlArquivo = file;
    script.nome = name;
    script.mapeamento = completeMapping;

    return script;
  }

}

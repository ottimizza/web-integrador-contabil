import { Integration } from './Integration';
import { Organization } from './Organization';
import { User } from './User';

export enum ScriptStatus {
  ENCAMINHADO_PARA_PRE_ENTREGA = -1,

  INICIANDO,
  PROCESSANDO_PLANILHA,

  AGUARDANDO_MAPEAMENTO,
  AGUARDANDO_CONFIRMACAO,
  OK

  // Fluxo Padrão:            0 > 3 > -1 > 4
  // Fluxo Planilha Simples:  0 > 1 > 2 > 3 > 4
  // Fluxo Planilha Complexa: 0 > 1 > -1 > 3 > 4
  // Fluxo Cartão/Extrato:    0 > 3 > 4

}

export class Script {

  public id: number;
  public status: ScriptStatus;
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
    script.status = ScriptStatus.INICIANDO;

    return script;
  }

  public static secondPart(file: string, name: string, completeMapping: Integration) {
    const script = new Script();

    script.urlArquivo = file;
    script.nome = name;
    script.mapeamento = completeMapping;

    return script;
  }

  public statusDescription() {
    switch (this.status) {
      case ScriptStatus.INICIANDO:                    return 'INICIANDO - 1 / 5';
      case ScriptStatus.PROCESSANDO_PLANILHA:         return 'PROCESSANDO PLANILHA - 2 / 5';
      case ScriptStatus.AGUARDANDO_MAPEAMENTO:        return 'AGUARDANDO MAPEAMENTO - 3 / 5';
      case ScriptStatus.AGUARDANDO_CONFIRMACAO:       return 'CONCLUINDO - 4 / 5';
      case ScriptStatus.OK:                           return 'OK - 5 / 5';
      case ScriptStatus.ENCAMINHADO_PARA_PRE_ENTREGA: return 'ENCAMINHADO PARA OTTIMIZZA';
      default:                                        return 'PROCESSO INVÁLIDO!';
    }
  }

}

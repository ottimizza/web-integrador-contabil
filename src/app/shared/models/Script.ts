import { Integration } from './Integration';
import { User } from './User';
import { Empresa } from './Empresa';

export enum ScriptStatus {

  INICIANDO = 1,
  TIPO_DEFINIDO,
  PROCESSANDO_PLANILHA,
  AGUARDANDO_MAPEAMENTO,
  AGUARDANDO_DETALHAMENTO,
  AGUARDANDO_CONFIRMACAO,
  PRE_ENTREGA,
  OK

}

export enum ScriptType {
  PAGAMENTOS_PARA_PRE_ENTREGA = 1,
  RECEBIMENTOS_PARA_PRE_ENTREGA
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
  public checklist: boolean;
  public tipoProjeto: ScriptType;

  public static firstPart(company: Empresa) {
    const script = new Script();
    const currentAccounting = User.fromLocalStorage().organization;

    script.empresaId = company.id;
    script.cnpjEmpresa = company.cnpj;
    script.contabilidadeId = currentAccounting.id;
    script.cnpjContabilidade = currentAccounting.cnpj;
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
      case ScriptStatus.INICIANDO:                    return '1 / 7 - INICIADO';
      case ScriptStatus.TIPO_DEFINIDO:                return '2 / 7 - TIPO DEFINIDO';
      case ScriptStatus.PROCESSANDO_PLANILHA:         return '3 / 7 - PROCESSANDO PLANILHA';
      case ScriptStatus.AGUARDANDO_MAPEAMENTO:        return '4 / 7 - AGUARDANDO MAPEAMENTO';
      case ScriptStatus.AGUARDANDO_DETALHAMENTO:      return '5 / 7 - AGUARDANDO PREENCHIMENTO DE DETALHES';
      case ScriptStatus.AGUARDANDO_CONFIRMACAO:       return '6 / 7 - AGUARDANDO CONFIRMAÇÃO';
      case ScriptStatus.OK:                           return '7 / 7 - OK';
      case ScriptStatus.PRE_ENTREGA:                  return 'ENCAMINHADO PARA ANÁLISE DA EQUIPE OTTIMIZZA';
      default:                                        return 'PROCESSO INVÁLIDO!';
    }
  }

}

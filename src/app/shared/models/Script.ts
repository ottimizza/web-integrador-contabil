import { Integration } from './Integration';

export class Script {

  public id: number;
  public status: number;
  public dataCriacao: any;
  public dataAtualizacao: any;

  constructor(
    public nome: string,
    public urlArquivo: string,
    public empresaId: number,
    public cnpjEmpresa: string,
    public contabilidadeId: number,
    public cnpjContabilidade: string,
    public tipoRoteiro: string,
    public mapeamento: Integration,
  ) {}
}

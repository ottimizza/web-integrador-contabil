import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { ScriptStatus } from '@shared/models/Script';

export const WORKFLOW_COMPLEX_FILTER_OPTIONS = {
  rules: [
    SearchRule.builder()
    .id('type')
    .value({ tipoRoteiro: 'PAG' })
    .description('Tipo do Projeto: Pagamentos')
    .keywords(['tipo', 'pagamentos'])
    .build(),
    SearchRule.builder()
    .id('type')
    .value({ tipoRoteiro: 'REC' })
    .description('Tipo do Projeto: Recebimentos')
    .keywords(['tipo', 'recebimentos'])
    .build(),
    SearchRule.builder()
    .id('status')
    .value({ status: ScriptStatus.INICIANDO })
    .description('Situação: Iniciado')
    .keywords(['1', 'iniciado', 'status', 'situacao', 'situação', 'situaçao', 'situacão'])
    .build(),
    SearchRule.builder()
    .id('status')
    .value({ status: ScriptStatus.PROCESSANDO_PLANILHA })
    .description('Situação: Processando Planilha')
    .keywords(['2', 'processando', 'planilha', 'status', 'situacao', 'situação', 'situaçao', 'situacão'])
    .build(),
    SearchRule.builder()
    .id('status')
    .value({ status: ScriptStatus.ARQUIVO_OK })
    .description('Situação: Pronto para Prosseguir')
    .keywords(['3', 'pronto', 'prosseguir', 'arquivo', 'status', 'situacao', 'situação', 'situaçao', 'situacão'])
    .build(),
    SearchRule.builder()
    .id('status')
    .value({ status: ScriptStatus.AGUARDANDO_MAPEAMENTO })
    .description('Situação: Aguardando Mapeamento')
    .keywords(['4', 'aguardando', 'mapeamento', 'status', 'situacao', 'situação', 'situaçao', 'situacão'])
    .build(),
    SearchRule.builder()
    .id('status')
    .value({ status: ScriptStatus.AGUARDANDO_DETALHAMENTO })
    .description('Situação: Aguardando Detalhamento')
    .keywords(['5', 'aguardando', 'detalhamento', 'status', 'situacao', 'situação', 'situaçao', 'situacão'])
    .build(),
    SearchRule.builder()
    .id('status')
    .value({ status: ScriptStatus.AGUARDANDO_CONFIRMACAO })
    .description('Situação: Aguardando Confirmação')
    .keywords(['6', 'aguardando', 'confirmação', 'confirmacao', 'confirmaçao', 'confirmacão', 'status', 'situacao', 'situação', 'situaçao', 'situacão'])
    .build(),
    SearchRule.builder()
    .id('status')
    .value({ status: ScriptStatus.PRE_ENTREGA })
    .description('Situação: Encaminhado para Ottimizza')
    .keywords(['pre', 'pré', 'entrega', 'ottimizza', 'status', 'situacao', 'situação', 'situaçao', 'situacão'])
    .build(),
    SearchRule.builder()
    .id('status')
    .value({ status: ScriptStatus.OK })
    .description('Situação: Ok')
    .keywords(['7', 'ok', 'status', 'situacao', 'situação', 'situaçao', 'situacão'])
    .build()
  ],

  defaultRule: SearchRule.builder()
    .id('company')
    .value({ nomeCompleto: '' })
    .description('Empresa: {0}')
    .build(),

  hackings: [
    HackingRule.builder()
    .id('name')
    .value({ nome: '' })
    .description('Projeto: {0}')
    .regex(/(projeto)\:\s(?<value>.+)/ig)
    .build()
  ]
};

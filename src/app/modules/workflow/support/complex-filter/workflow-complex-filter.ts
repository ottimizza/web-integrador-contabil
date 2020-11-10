import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchRule } from '@shared/components/search/models/SearchRule';

export const WORKFLOW_COMPLEX_FILTER_OPTIONS = {
  defaultRule: SearchRule.builder()
    .id('company')
    .value({ nomeCompleto: '' })
    .description('Empresa: {0}')
    .build(),

  hackings: [
    HackingRule.builder()
    .id('cnpj')
    .value({ cnpj: '' })
    .description('CNPJ contém: {0}')
    .regex(/(cnpj)\:\s(?<value>.+)/ig)
    .build(),
    HackingRule.builder()
    .id('cnpj')
    .value({ cnpj: '' })
    .description('CPF contém: {0}')
    .regex(/(cpf)\:\s(?<value>.+)/ig)
    .build(),
    HackingRule.builder()
    .id('nomeResumido')
    .value({ nomeResumido: '' })
    .description('Apelido contém: {0}')
    .regex(/(apelido)\:\s(?<value>.+)/ig)
    .build()
  ]
};

import { FilterData } from '@shared/components/default-filter/default-filter.component';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchRule } from '@shared/components/search/models/SearchRule';

export const SCRIPT_COMPLEX_FILTER_OPTIONS: FilterData = {
  defaultRule: SearchRule.builder()
  .id('name')
  .description('Nome contém: {0}')
  .value({ razaoSocial: '' })
  .build(),

  hackings: [
    HackingRule.builder()
    .id('cnpj')
    .value({ cnpj: '' })
    .description('CNPJ igual a: {0}')
    .regex(/(cnpj)\:\s(?<value>.+)/ig)
    .build(),
    HackingRule.builder()
    .id('nick')
    .value({ nomeResumido: '' })
    .description('Apelido contém: {0}')
    .regex(/(apelido)\:\s(?<value>.+)/ig)
    .build(),
    HackingRule.builder()
    .id('erp')
    .value({ codigoERP: '' })
    .description('Código ERP contém: {0}')
    .regex(/(erp)\:\s(?<value>.+)/ig)
    .build(),
  ]
};

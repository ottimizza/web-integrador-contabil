import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { environment } from '@env';

import { GenericPageableResponse, PageInfo } from '@shared/models/GenericPageableResponse';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { Lancamento } from '@shared/models/Lancamento';
import { PostFormatRule } from '@shared/models/Rule';
import { Empresa } from '@shared/models/Empresa';
import { KeyMap } from '@shared/models/KeyMap';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '@shared/models/User';
import { ArrayUtils } from '@shared/utils/array.utils';
import { lastValueOnly } from '@shared/operators/last-value-only.operator';

const BASE_URL = `${environment.serviceUrl}/api/v1/lancamentos`;

@Injectable({ providedIn: 'root' })
export class LancamentoService {


  constructor(private http: HttpHandlerService) { }

  public getLancamentos(searchCriteria: any) {
    return this.http.get<GenericPageableResponse<Lancamento>>([BASE_URL, searchCriteria], 'Falha ao obter lançamentos!');
  }

  public import(entry: Lancamento) {
    const url = `${BASE_URL}/importar`;
    return this.http.post(url, entry, 'Falha ao gerar lançamentos!');
  }

  public inactivate(fileId: number) {
    const url = `${BASE_URL}/inativar/${fileId}`;
    return this.http.put(url, {}, 'Falha ao excluir lançamento!');
  }

  public calcPercentage(searchCriteria: any) {
    const url = `${BASE_URL}/porcentagem`;
    return this.http.get([url, searchCriteria], 'Falha ao obter porcentagem de lançamentos concluídos!');
  }

  public totalPerFile(tipoMovimento: string, cnpjEmpresa: string, cnpjContabilidade: string) {
    const searchCriteria = { tipoMovimento, cnpjEmpresa, cnpjContabilidade };
    const url = `${BASE_URL}/total_arquivos`;
    return this.http.get<GenericResponse<{ numeroLancamentos: number, nomeArquivo: string }>>
      ([url, searchCriteria], 'Falha ao obter o total de lançamentos agrupado por arquivo!');
  }

  public skip(id: number): Observable<Lancamento> {
    return this.patch(id, { tipoConta: 4 });
  }

  public patch(id: number, body: KeyMap<Lancamento>) {
    const url = `${BASE_URL}/${id}`;
    return this.http.patch<Lancamento>(url, body, 'Falha ao vincular lançamento!');
  }

  public fetchByRule(rules: PostFormatRule[], searchCriteria: any): Observable<GenericPageableResponse<Lancamento>> {
    const url = `${BASE_URL}/regras`;
    return this.http.post<GenericPageableResponse<Lancamento>>
    ([url, searchCriteria], rules, 'Falha ao obter lançamentos afetados!')
    .pipe(lastValueOnly(url));
  }

  public ignoreLancamento(lancamento: Lancamento): Observable<Lancamento> {
    const url = `${BASE_URL}/${lancamento.id}/ignorar`;
    return this.http.post<Lancamento>(url, {}, 'Falha ao ignorar lançamento!');
  }

  public saveAsDePara(lancamento: Lancamento, account: string): Observable<Lancamento> {
    const url = `${BASE_URL}/${lancamento.id}/depara?contaMovimento=${account}`;
    return this.http.post<Lancamento>(url, {}, 'Falha ao vincular lançamento a uma conta de fornecedor!');
  }

  public question(entryId: number) {
    if (!environment.production) {
      entryId = 1024552;
    }
    const url = `${BASE_URL}/${entryId}/questionar`;
    const param = {
      url: window.location.origin + '/description/'
    };
    return this.http.post([url, param], {}, 'Falha ao questionar cliente!');
  }

  /**
   * @deprecated
   * Não está realmente deprecado, mas não utilize em produção :)
   */
  public async reset(company: Empresa) {
    if (environment.production !== false || !window.confirm(`Tem certeza que deseja reiniciar os lançamentos da empresa ${company.razaoSocial}?`)) {
      return;
    }

    console.warn(`Iniciando reset de lançamentos da empresa ${company.razaoSocial}`);

    let records: Lancamento[] = [];
    let pageInfo = new PageInfo({ pageIndex: 0, hasNext: true });

    while (pageInfo.hasNext) {
      console.warn(`Buscando lançamentos pela ${pageInfo.pageIndex + 1}ª vez...`);
      const resultSet = await this.getLancamentos({
        pageIndex: pageInfo.pageIndex,
        pageSize: 100,
        cnpjEmpresa: company.cnpj,
        cnojContabilidade: User.fromLocalStorage().organization.cnpj,
        ativo: false
      }).toPromise();

      console.warn('Lançamentos obtidos:', resultSet.records);

      records = records.concat(resultSet.records);
      pageInfo = resultSet.pageInfo;
      pageInfo.pageIndex++;
    }
    console.warn(`${records.length} lançamentos obtidos com sucesso, iniciando atualização dos mesmos`);

    const packages = ArrayUtils.package(records, 50);
    let packageCount = 1;
    for (const pack of packages) {
      console.warn(`Atualizando ${packageCount}° pacote de 50 lançamentos`);
      await forkJoin(pack.map(rec => {
        return this.patch(rec.id, { tipoConta: 0, ativo: true, contaMovimento: null, regraId: null });
      })).toPromise();
      packageCount++;
    }
    console.warn('Lançamentos resetados com sucesso!');
  }

  /**
   * @deprecated
   */
  public getByRulePaginated(rules: PostFormatRule[], e: Empresa, page: number, pageSize: number) {
    const searchCriteria = { cnpjEmpresa: e.cnpj, pageIndex: page, pageSize, tipoConta: 0, ativo: true };
    return this.fetchByRule(rules, searchCriteria);
  }

  /**
   * @deprecated
   */
  public getByRule(rules: PostFormatRule[], e: Empresa) {
    const searchCriteria = { cnpjEmpresa: e.cnpj, pageSize: 1, ativo: true };
    return this.fetchByRule(rules, searchCriteria);
  }

  /**
   * @deprecated
   */
  public getPercentage(cnpjEmpresa: string, tipoMovimento: string) {
    return this.calcPercentage({ cnpjEmpresa, tipoMovimento });
  }

}

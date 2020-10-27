import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';
import { Lancamento } from '@shared/models/Lancamento';
import { User } from '@shared/models/User';

const TUTORIAL: GuidedTour = {
  tourId: 'tutorial-ultima-digitacao',
  steps: [
    {
      title: `Nesta tela você irá realizar  sua Última Digitação contábil, para isto basta:`,
      content: ``,
    },
    {
      title: '',
      content: `
      <h5>
        1. Escolher uma empresa para realizar a Última Digitação;
      </h5>
      `,
      selector: '#breadcrumb-input-filter-content',
      orientation: Orientation.Bottom,
      highlightPadding: 12
    },
    {
      title: '',
      content: `
      <h5>
        2. Caso o pagamento seja para uma conta de Despesa, clique nas palavras-chaves necessárias.
      </h5>
      `,
      selector: '.main-card',
      orientation: Orientation.Top,
      highlightPadding: 12
    },
    {
      title: '',
      content: `
      <h5>
        3. Definidas as palavras-chaves, indique a conta da Despesa;
      </h5>
      `,
      selector: '.form-group.col-md-3.mt-1',
      orientation: Orientation.Top,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        4. Sendo então uma Despesa, clique no botão abaixo:
      </h5>
      `,
      selector: '#button-rule',
      orientation: Orientation.Top,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        5. Caso seja uma conta de Fornecedor ou de Cliente, você apenas precisa informar a conta e clicar no botão abaixo:
      </h5>
      `,
      selector: '#button-provider',
      orientation: Orientation.Top,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        6. E para ignorar um lançamento, selecione as palavras-chaves que informam o porquê do lançamento estar sendo ignorado, e clique em "Ignorar";
      </h5>
      `,
      selector: '#ignore-button',
      orientation: Orientation.Top,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        7. Caso você não saiba o que fazer com este lançamento, você pode simplesmente navegar entre os demais.
      </h5>
      `,
      selector: '.button-area.col.mx-2',
      orientation: Orientation.Top,
      highlightPadding: 5
    },
    {
      title: 'Defina sua ação e ótimo trabalho!',
      content: ``,
    }
  ]
};

let user: User;
const getUser = () => {
  if (!user) {
    user = User.fromLocalStorage();
  }
  return user;
};

const FAKE_ENTRY: Lancamento = {
  arquivo: {
    cnpjContabilidade: getUser()?.organization?.cnpj,
    cnpjEmpresa: getUser()?.organization?.cnpj,
    id: -10,
    labelComplemento01: 'DETALHE',
    labelComplemento02: 'DETALHE',
    labelComplemento03: 'DETALHE',
    labelComplemento04: 'DETALHE',
    labelComplemento05: 'DETALHE',
    nome: 'Nome_do_arquivo.xlsx'
  },
  ativo: true,
  centroCusto: null,
  cnpjContabilidade: getUser()?.organization?.cnpj,
  cnpjEmpresa: getUser()?.organization?.cnpj,
  competencia: '09/2020',
  competenciaAnterior: '08/2020',
  complemento01: 'RECISÓRIO',
  complemento02: '',
  complemento03: '',
  complemento04: '',
  complemento05: '',
  contaContraPartida: null,
  contaMovimento: null,
  contaSugerida: null,
  dataMovimento: null,
  descricao: 'PAGAMENTO FGTS',
  documento: null,
  id: -10,
  idRoteiro: getUser()?.email,
  nomeArquivo: 'Nome_do_arquivo.xlsx',
  portador: 'EM BRANCO',
  tipoConta: 0,
  tipoLancamento: 1,
  tipoMovimento: 'PAG',
  tipoPlanilha: 'MOVIMENTOS A PARTE',
  valorDesconto: null,
  valorJuros: null,
  valorMulta: null,
  valorOriginal: null,
  valorPago: 1822.09
};

export { TUTORIAL, FAKE_ENTRY };

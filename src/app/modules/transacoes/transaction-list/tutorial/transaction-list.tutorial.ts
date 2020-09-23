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
        2. Parametrizar os lançamentos clicando nos termos desejados;
      </h5>
      `,
      selector: '#detail-descricao-input',
      orientation: Orientation.Top,
      highlightPadding: 12
    },
    {
      title: '',
      content: `
      <h5>
        3. Informar se este lançamento possui uma conta Fornecedo/Cliente;
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
        4. Ou se você deseja criar uma regra com ele;
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
        5. Ou se ele deve ser ignorado;
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
        6. Ou até mesmo se você não deseja fazer nada com ele no momento e só quer visualizar os demais lançamentos;
      </h5>
      `,
      selector: '.button-area.col.mx-2',
      orientation: Orientation.Top,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        7. Caso você queira criar uma regra ou definir uma conta de Fornecedor/Cliente, será necessário informar uma Conta Movimento.
      </h5>
      `,
      selector: '.form-group.col-md-3.mt-1',
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
    cnpjContabilidade: getUser().organization.cnpj,
    cnpjEmpresa: getUser().organization.cnpj,
    id: -10,
    labelComplemento01: null,
    labelComplemento02: null,
    labelComplemento03: null,
    labelComplemento04: null,
    labelComplemento05: null,
    nome: 'Nome_do_arquivo.xlsx'
  },
  ativo: true,
  centroCusto: null,
  cnpjContabilidade: getUser().organization.cnpj,
  cnpjEmpresa: getUser().organization.cnpj,
  competencia: '09/2020',
  competenciaAnterior: '08/2020',
  complemento01: null,
  complemento02: null,
  complemento03: null,
  complemento04: null,
  complemento05: null,
  contaContraPartida: null,
  contaMovimento: null,
  contaSugerida: null,
  dataMovimento: '2020-09-23',
  descricao: 'Banco',
  documento: null,
  id: -10,
  idRoteiro: getUser().email,
  nomeArquivo: 'Nome_do_arquivo.xlsx',
  portador: 'EM BRANCO',
  tipoConta: 0,
  tipoLancamento: 1,
  tipoMovimento: 'PAG',
  tipoPlanilha: 'MOVIMENTOS A PARTE',
  valorDesconto: null,
  valorJuros: null,
  valorMulta: null,
  valorOriginal: 1822.09,
  valorPago: 1822.09
};

export { TUTORIAL, FAKE_ENTRY };

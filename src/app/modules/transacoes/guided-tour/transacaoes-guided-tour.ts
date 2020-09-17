import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

const DASHBOARD_TOUR: GuidedTour = {
  tourId: 'transactions-tour',
  useOrb: false,
  steps: [
    {
      title: 'Você pode tomar 4 ações nesta tela principal:',
      content: ``
    },
    {
      title: '',
      selector: '#company-filter',
      highlightPadding: 12,
      content: `
        <h5>
        1. Escolher uma empresa para realizar a Última Digitação; ou
        </h5>
      `,
      orientation: Orientation.Bottom
    },
    {
      title: '',
      selector: '#sidebar-item-regras',
      content: `
        <h5>
        2. Verificar regras já definidas anteriormente; ou
        </h5>
      `,
      orientation: Orientation.Right
    },
    {
      title: '',
      selector: '#sidebar-item-historicos',
      content: `
        <h5>
        3. Verificar históricos já definidos anteriormente; ou
        </h5>
      `,
      orientation: Orientation.Right
    },
    {
      title: '',
      selector: '#sidebar-item-fluxo-planilhas',
      content: `
        <h5>
        4. Criar um roteiro para poder processar suas planilhas antes de parametrizá-las
        </h5>
      `,
      orientation: Orientation.Right
    },
    {
      title: 'Defina sua ação e ótimo trabalho!',
      content: ``
    }
  ]
};

export default DASHBOARD_TOUR;

import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

const TUTORIAL: GuidedTour = {
  tourId: 'tutorial-ultima-digitacao',
  steps: [
    {
      title: 'Você pode tomar 3 ações nesta tela principal!',
      content: ``,
    },
    {
      title: '',
      content: `
      <h5>
        1. Escolher uma empresa para realizar a Última Digitação; ou
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
        2. Verificar regras já definidas anteriormente; ou
      </h5>
      `,
      selector: '#sidebar-item-regras',
      orientation: Orientation.Right
    },
    {
      title: '',
      content: `
      <h5>
        3. Verificar históricos já definidas anteriormente.
      </h5>
      `,
      selector: '#sidebar-item-historicos',
      orientation: Orientation.Right
    },
    {
      title: 'Defina sua ação e ótimo trabalho!',
      content: ``,
    },
  ]
};

export default TUTORIAL;

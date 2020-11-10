import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

export const WORKFLOW_TUTORIAL: GuidedTour = {
  tourId: 'tutorial-projetos',
  steps: [
    {
      title: 'Você pode tomar 2 ações nesta tela!',
      content: ''
    },
    {
      title: '',
      content: `
      <h5>
        1. Criar uma empresa; ou
      </h5>
      `,
      selector: '#action-button-new-company',
      orientation: Orientation.Left,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        2. Verificar empresas já criadas.
      </h5>
      `,
      selector: '#project-list-table',
      orientation: Orientation.Top,
      highlightPadding: 12
    },
    {
      title: 'Defina sua ação e ótimo trabalho!',
      content: ``,
    },
  ]
};

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
        1. Criar um projeto; ou
      </h5>
      `,
      selector: '#action-button-new-script',
      orientation: Orientation.Left,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        2. Verificar projetos já criados.
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

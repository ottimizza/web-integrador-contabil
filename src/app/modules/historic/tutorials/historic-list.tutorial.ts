import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

const getTutorial = (isAdministrator: boolean) => {

  const tutorial: GuidedTour = {
    tourId: 'tutorial-historicos',
    steps: [
      {
        title: `Você pode realizar ${isAdministrator ? 5 : 4} ações nesta tela`,
        content: ''
      },
      {
        title: '',
        content: `
          <h5>
            1. Escolher a empresa que deseja visualizar os históricos;
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
            2. Verificar históricos já existentes;
          </h5>
        `,
        orientation: Orientation.Top,
        highlightPadding: 5,
        selector: '#historic-card-description--10'
      },
      {
        title: '',
        content: `
          <h5>
            3. Excluir históricos;
          </h5>
        `,
        orientation: Orientation.Right,
        selector: '#historic-card-delete--10',
        highlightPadding: 5
      },
      {
        title: '',
        content: `
          <h5>
            4. Alterar históricos;
          </h5>
        `,
        selector: '#historic-card-edit--10',
        highlightPadding: 5
      },
    ]
  };

  if (isAdministrator) {
    tutorial.steps.push({
      title: '',
      content: `
        <h5>
          5. Exportar históricos e regras para o CRM.
        </h5>
      `,
      orientation: Orientation.Left,
      selector: '#action-button-crm',
      highlightPadding: 5
    });
  }

  tutorial.steps.push({
    title: 'Defina sua ação e ótimo trabalho!',
    content: ``,
  });

  return tutorial;

};

export default getTutorial;

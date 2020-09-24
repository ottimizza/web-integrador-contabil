import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

const getTutorial = (isAdministrator: boolean) => {

  const tutorial: GuidedTour = {
    tourId: 'tutorial-regras',
    steps: [
      {
        title: `Você pode realizar ${isAdministrator ? 7 : 6} ações nesta tela`,
        content: ''
      },
      {
        title: '',
        content: `
          <h5>
            1. Escolher a empresa que deseja visualizar as regras;
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
            2. Verificar regras já existentes;
          </h5>
        `,
        orientation: Orientation.Top,
        highlightPadding: 5,
        selector: '#rule-description--10'
      },
      {
        title: '',
        content: `
          <h5>
            3. Excluir regras;
          </h5>
        `,
        orientation: Orientation.Right,
        selector: '#delete-rule-button--10',
        highlightPadding: 5
      },
      {
        title: '',
        content: `
          <h5>
            4. Clonar regras;
          </h5>
        `,
        orientation: Orientation.Right,
        selector: '#clone-rule-button--10',
        highlightPadding: 5
      },
      {
        title: '',
        content: `
          <h5>
            5. Alterar regras;
          </h5>
        `,
        selector: '#edit-rule-button--10',
        highlightPadding: 5
      },
      {
        title: '',
        content: `
          <h5>
            6. Mover regras${isAdministrator ? ';' : '.'}
          </h5>
        `,
        selector: '#move-rule-buttons--10',
        orientation: Orientation.Left,
        highlightPadding: 5
      }
    ]
  };

  if (isAdministrator) {
    tutorial.steps.push({
      title: '',
      content: `
        <h5>
          7. Exportar regrs e históricos para o CRM.
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

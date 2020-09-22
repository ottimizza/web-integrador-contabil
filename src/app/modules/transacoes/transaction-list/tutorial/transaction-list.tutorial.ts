import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

const getTutorial = (isAdministrator: boolean) => {
  const TUTORIAL: GuidedTour = {
    tourId: 'tutorial-ultima-digitacao',
    steps: [
      {
        title: `Você pode tomar ${isAdministrator ? 5 : 4} ações nesta tela principal!`,
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
          3. Verificar históricos já definidos anteriormente; ou
        </h5>
        `,
        selector: '#sidebar-item-historicos',
        orientation: Orientation.Right
      }
    ]
  };

  if (isAdministrator) {
    TUTORIAL.steps.push({
      title: '',
      content: `
      <h5>
        4. Importar uma planilha para criar um projeto.
      </h5>
      `,
      selector: '#sidebar-item-fluxo-planilhas',
      orientation: Orientation.Right
    });
  }
  TUTORIAL.steps.push({
    title: 'Defina sua ação e ótimo trabalho!',
    content: ``,
  });

  return TUTORIAL;

};

export default getTutorial;

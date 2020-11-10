import { GuidedTour, Orientation } from '@gobsio/ngx-guided-tour';

export const SCRIPT_TUTORIAL: GuidedTour = {
  tourId: 'tutorial-roteiros',
  steps: [
    {
      title: 'Nesta tela, você deve seguir 5 passos simples!',
      content: ''
    },

    {
      title: '',
      content: `
      <h5>
        1. Selecionar a empresa que você deseja projetar...
      </h5>
      `,
      selector: '#script-stepper-company',
      orientation: Orientation.Right,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        [...] ou se você não encontrar a empresa desejada, você pode criá-la;
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
        2. Subir os materiais, ou seja, o arquivo que você quer realizar o projeto;
      </h5>
      `,
      selector: '#script-stepper-material',
      orientation: Orientation.BottomRight,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        3. Informar se este arquivo contém Pagamentos ou Recebimentos;
      </h5>
      `,
      selector: '#script-stepper-type',
      orientation: Orientation.Bottom,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        4. Responder algumas perguntas que nos orientem a parametrizar seu projeto de forma mais rápida e precisa;
      </h5>
      `,
      selector: '#script-stepper-definitions',
      orientation: Orientation.BottomLeft,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        5. Por fim, dê um nome ao seu projeto para concluí-lo.
      </h5>
      `,
      selector: '#script-stepper-confirm',
      orientation: Orientation.Left,
      highlightPadding: 5
    },
    {
      title: '',
      content: `
      <h5>
        Seu progresso é salvo automaticamente, você pode parar a qualquer momento e continuar depois.
      </h5>
      `,
      selector: '#action-button-cancel',
      orientation: screen.width > 768 ? Orientation.Left : Orientation.Bottom,
      highlightPadding: 5
    },

    {
      title: 'Defina sua ação e ótimo trabalho!',
      content: ``,
    },
  ]
};

export const setIds = (doc: Document) => {
    doc.getElementsByClassName('mat-step-header')[0].id = 'script-stepper-material';
    doc.getElementsByClassName('mat-step-header')[1].id = 'script-stepper-type';
    doc.getElementsByClassName('mat-step-header')[2].id = 'script-stepper-definitions';
    doc.getElementsByClassName('mat-step-header')[3].id = 'script-stepper-confirm';
};

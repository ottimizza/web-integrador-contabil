import { Transacao } from '../../transacoes/transacao/transacao';

export class TestHelper {

    static randomTransaction() {

        return new Transacao(
            Math.round(Math.random() * 100),
            new Date(Math.round(Math.random() * 1575913620161)),
            parseFloat((Math.random() * 10000).toFixed(2)),
            'Fornecedor Fake',
            '111.222.333-44',
            'Banco do Brasil',
            'Lorem ipsum.'
        );

    }

    static ipsum() {
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non metus bibendum, faucibus odio sed, dictum magna. Fusce feugiat commodo porttitor. Curabitur a mi id purus mattis accumsan. Proin ornare urna ultrices diam sagittis, eu condimentum ipsum aliquam. Suspendisse non turpis eu ante congue laoreet. Nunc pellentesque porta magna non congue. Mauris non luctus quam, vel elementum tellus. Sed cursus arcu ac eleifend vestibulum. Pellentesque sagittis non quam id dictum. Fusce ut tortor diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur justo quis quam ultrices euismod. Suspendisse et faucibus justo. Pellentesque eget ullamcorper quam, sit amet ultrices.'
    }

}

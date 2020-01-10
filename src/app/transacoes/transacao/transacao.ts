export class Transacao {

    private _conta: string;

    constructor(
        readonly id: number,
        private _data: Date,
        readonly valor: number,
        readonly fornecedor: string,
        readonly documento: string,
        readonly banco: string,
        readonly complemento01: string,
        readonly complemento02: string,
        readonly complemento03: string,
        readonly complemento04: string,
        readonly complemento05: string,
        readonly tipoPlanilha: string,
        readonly nomeArquivo: string
    ) {
        this.fornecedor = fornecedor.toUpperCase();
        this.banco = banco.toUpperCase();
        this.complemento01 = complemento01.toUpperCase();
        this.complemento02 = complemento02.toUpperCase();
        this.complemento03 = complemento03.toUpperCase();
        this.complemento04 = complemento04.toUpperCase();
        this.complemento05 = complemento05.toUpperCase();
        this.nomeArquivo = nomeArquivo.toUpperCase();
    }

    set conta(conta: string) {
        if (!this._conta) {
            this._conta = conta;
        }
    }

    get conta() {
        return this._conta;
    }

    get data() {
        let dia = this._data.getDate().toString();
        let mes = (this._data.getMonth() + 1).toString();
        const ano = this._data.getFullYear().toString();

        if (parseInt(mes) < 10) {
          mes = '0' + mes;
        }
        if (parseInt(dia) < 10) {
          dia = '0' + dia;
        }

        return `${dia}/${mes}/${ano}`;
    }

}

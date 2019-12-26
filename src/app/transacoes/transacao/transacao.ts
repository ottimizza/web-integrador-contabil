export class Transacao {

    private _conta: string;

    constructor(
        readonly id: number,
        private _data: Date,
        readonly valor: number,
        readonly fornecedor: string,
        readonly documento: string,
        readonly banco: string,
        readonly complemento: string,
    ) {
        this.fornecedor = fornecedor.toUpperCase();
        this.banco = banco.toUpperCase();
        this.complemento = complemento.toUpperCase();
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

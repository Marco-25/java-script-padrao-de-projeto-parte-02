class NegociacoesApi {

    constructor() {

        this._http = new HttpRequest();
    }

    obterNegociacoesDaSemana() {

         return new Promise((resolve, reject) => {
                this._http
                    .get('/negociacoes/semana')
                    .then(negociacoes => {
                        resolve(negociacoes
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    })
                    .catch( erro => {
                        console.log(erro);
                        reject("Não foi possivel carregar a lista de negociações");
                    });
         });
    }
    /***************************************************/

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
            this._http
                .get('/negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch( erro => {
                    console.log(erro);
                    reject("Não foi possivel carregar a lista de negociações");
                });
        });
    }

    /*************************************************************/

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            this._http
                .get('/negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch( erro => {
                    console.log(erro);
                    reject("Não foi possivel carregar a lista de negociações");
                });
        });
    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });

    }
}
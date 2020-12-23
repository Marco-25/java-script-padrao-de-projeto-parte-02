class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind( new ListaNegociacoes(), new NegociacoesView($('#negociacoes-view')), 'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-view')), 'texto');
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociação feita com sucesso.";

        this._limpaFormulario();
    }

    //prestar atenção nessa parte do codigo ***
    // ver classe NegociacoesApi
    importaNegociacoes() {

       let xhr = new NegociacoesApi();
       xhr.obterNegociacoesDaSemana( (erro, respostas) => {
           if (erro) return this._mensagem.texto = erro;

           respostas.forEach((resposta) => {
               this._listaNegociacoes.adiciona(resposta);
               this._mensagem.texto = "Negociações importadas com sucesso.";
           });

       });
    }
    //prestar atenção nessa parte do codigo ***

    apaga() {

        this._listaNegociacoes.esvazia();

        this._mensagem.texto = "Lista de negociações apagada.";
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}
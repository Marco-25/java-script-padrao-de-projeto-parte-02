class NegociacoesApi {

     obterNegociacoesDaSemana(callback) {

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/negociacoes/semana");

        xhr.onreadystatechange =  () => {

            if (xhr.readyState === 4) {

                if (xhr.status === 200){

                    callback(null,JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        // .forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
                } else {

                    console.log(JSON.parse(xhr.responseText));
                    callback("Não foi possivel obter as negociações da semana.");
                }
            }
        };

        xhr.send();
    }
}
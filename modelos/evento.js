import eventoDAO from "../persistencia/eventoDAO.js";

export default class evento {
    #nomeEvento;
    #dataEvento;
    #localEvento;
    #preco;
    #detalhe;

    constructor(nomeEvento="", dataEvento="", localEvento="", preco="", detalhe="") {
        this.#nomeEvento = nomeEvento;
        this.#dataEvento = dataEvento;
        this.#localEvento = localEvento;
        this.#preco = preco;
        this.#detalhe = detalhe;
        }

    get nomeEvento(){
        return this.#nomeEvento;
    }    

    set nomeEvento(novoEvento){
        this.#nomeEvento = novoEvento;
    }

    get dataEvento(){
        return this.#dataEvento;
    }

    set dataEvento(novodataEvento){
        this.#dataEvento = novodataEvento;
    }

    get localEvento(){
        return this.#localEvento;
    }

    set localEvento(novoLocalEvento){
        this.#localEvento = novoLocalEvento;
    }

    get preco(){
        return this.#preco;
    }

    set preco(novoPreco){
        this.#preco = novoPreco;
    }

    get detalhe(){
        return this.#detalhe;
    }

    set detalhe(novoDetalhe){
        this.#detalhe = novoDetalhe;
    }


    async gravar(){
        const dao = new eventoDAO();
        await dao.gravar(this);
    }

    async atualizar(){
        const dao = new eventoDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new eventoDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new eventoDAO();
        return await dao.consultar(termoDePesquisa);
    }


    toString(){
        return `evento código: ${this.#nomeEvento} -  nome: ${this.#nomeEvento}`;
    }

    toJSON(){
        return {
            "nomeEvento": this.#nomeEvento,
            "dataEvento": this.#dataEvento,
            "localEvento": this.#localEvento,
            "preco": this.#preco,
            "detalhe": this.#detalhe,
        }
    }
}
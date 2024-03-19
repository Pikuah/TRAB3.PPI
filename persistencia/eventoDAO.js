import conectar from "./conexao.js";
import evento from "../modelos/evento.js";

export default class eventoDAO{
    async gravar(evento){
        if (evento instanceof evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento (nomeEvento, dataevento, localEvento, preco, detalhe) 
                         values (?, ?, ?, ?, ?)`;
            const parametros = [
                evento.nomeEvento,
                evento.dataEvento,
                evento.localEvento,
                evento.preco,
                evento.detalhe,
            ];

            const [resultados, campos] = await conexao.execute(sql,parametros);
            evento.codigo = resultados.insertId;
        }
    }

    async atualizar(evento){
        if (evento instanceof evento){
            const conexao = await conectar();
            const sql = `UPDATE evento SET nomeEvento = ?,
                         dataEvento = ?, localEvento = ?, preco = ?,
                         detalhe = ? WHERE id = ?`;
            const parametros = [
                evento.nomeEvento,
                evento.dataEvento,
                evento.localEvento,
                evento.preco,
                evento.detalhe,
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(evento){
        if (evento instanceof evento){
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE id = ?`;
            const parametros = [
                evento.codigo
            ]
            await conexao.execute(sql,parametros);
        }
    }


    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (!isNaN(parseInt(termoDePesquisa))){

            sql = `SELECT * FROM evento WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM evento WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
 
        let listaevento = [];
        for (const registro of registros){
            const evento = new evento(
                registro.nomeEvento,
                registro.dataEvento,
                registro.localEvento,
                registro.preco,
                registro.detalhe,
            );
            listaevento.push(evento);
        }
        return listaevento;
    }
}
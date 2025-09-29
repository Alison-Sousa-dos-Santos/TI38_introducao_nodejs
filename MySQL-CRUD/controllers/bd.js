require('dotenv').config()
const BD_HOST=process.env.BD_HOST
const BD_USER=process.env.BD_USER
const BD_PASSWORD=process.env.BD_PASSWORD
const BD_DATABASE = process.env.BD_DATABASE

const chaveAcesso = {
    host: BD_HOST,
    user: BD_USER,
    password: BD_PASSWORD,
    database: BD_DATABASE
}
//Função de conexão
const conectar = async () => {
    if (global.statusConexao){
        return global.conexao
    }
    const mysql = require('mysql2/promise')
    const con = await mysql.createConnection(chaveAcesso)
    global.conexao = con
    global.statusConexao=true
    console.log('Conectado ao Banco: ', global.statusConexao)
    return con
}
const obterCampos = async(tabela)=>{
    let con = await conectar()
    try {
        let sql= `DESCRIBE ${tabela}`
        let campos = await con.query(sql)
        return await campos[0]
    } catch (erro) {
        return `${tabela} não encontrada: ${erro}`
    }
}
const executarQuery = async (sql, dados='') => {
    let con = await conectar()
    try {
        let respBd = await con.query(sql, dados)
        respBd= respBd[1]? respBd[0]: respBd
        return await {dados:[...respBd], status:200, message:'Sucesso'}
    } catch (erro) {
        return {status:400, message:'Inconsistência nas informaçãoes: '+erro}
    }
}

module.exports = {
    inserir: async (tabela, dados)=>{
        let campos = await obterCampos(tabela)
        //Obter campos do bd
        campos = campos.map((el)=>el.Field) // Cria array com campos
        campos.shift() //Exclui a primeira posição ID
        // ['nome','professor']
        let argumentos = ''
        campos.forEach(el =>argumentos+=',?') // Cria str de ,?,?
        argumentos = argumentos.slice(1) //corta a ',' do inicio
        campos = campos.toString()
        const sql = `INSERT INTO ${tabela} (${campos}) VALUES (${argumentos});`
        //Salvar dados
        return await executarQuery(sql, dados)
    },
    ler: async (tabela, id='')=>{
        let sql = `SELECT * FROM ${tabela}`
        sql = id==''? sql: sql+` WHERE id=${id}` 
        let linhas = await executarQuery(sql)
        linhas.dados = linhas.dados.length==0?[{message:'Nenhum registro encontrato'}]:linhas.dados
        return await linhas
    },
    atualizar: async (tabela, dados, id)=>{
        let campos = await obterCampos(tabela)
        campos.shift()
        //['nome', 'nota1', 'nota2', 'nota3', 'nota4']
        campos = campos.map((el)=>el.Field+'=?')
        campos = campos.toString()
        // 'nome=?,nota1=?, nota2=?, nota3=?, nota4=?'
        let sql= `UPDATE ${tabela} SET ${campos} WHERE id =?`
        dados.push(id)
        return await executarQuery(sql, dados)

    },
    deletar: async (tabela, id)=>{
        let sql = `DELETE FROM ${tabela} WHERE id = ${id};`
        return await executarQuery(sql)

    }
}
const express = require("express")
const bd = require('./controllers/bd.js')
const cors = require("cors")
let app = express()
const PORT = 3200

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => res.send("<h1>Bem Vindo a API</h1>").status(200))

//Desenvolvimento de rota para CRUD

app.post('/api/:tabela', async (req, res) => {
    /*

        req.body ={
            nome:Joaquim
            nota1:9
            nota2:8
            nota3:7
            nota4:6
        }
        Object.keys(req.body) --> ['nome', 'nota1', 'nota2', 'nota3', 'nota4']
        Object.values(req.body) --> ['Joaquim', 9, 8, 7, 6]
    */
    try {
        //Extrai dados da requisição e transforma em array de valores
        let dados = Object.values(req.body).map((val) => val)
        let tabela = req.params.tabela
        let resBd = await bd.inserir(tabela, dados)
        res.json(respBd).status(201)
    } catch (error) {
        res.json(erro).status(400)
    }
})

//Leitura de dados
app.get('api/:tabela', async (req,res)=>{
    try{
        let tabela = req.params.tabela
        let resBd = await bd.ler(tabela)
        res.json(resBd).status(200)
    }catch (error) {
        res.json(erro).status(400)
    }
})

app.get('api/:tabela/:id', async (req,res)=>{
    try{
        let {tabela, id} = req.params
        let resBd = await bd.ler(tabela, id)
        res.json(resBd).status(200)
    }catch (error) {
        res.json(erro).status(400)
    }
})

// Atualização
app.patch('api/:tabela/:id', async (req, res)=>{
    try{
        let dados = Object.values(req.body).map((val) => val)
        let tabela = req.params
        let resBd = await bd.atualizar(tabela, dados, id)
        res.json(resBd).status(200)
    }catch (error) {
        res.json(erro).status(400)
    }
})

//Exclui dados
app.delete('api/:tabela/:id', async (req,res)=>{
    try{
        let {tabela, id} = req.params
        let resBd = await bd.deletar(tabela, id)
        res.json(resBd).status(200)
    }catch (error) {
        res.json(erro).status(400)
    }
})

app.use((req, res) => res.send("<h1>Erro 404 - URL não encontrada </h1>").status(404))



app.listen(PORT, () => console.log(`Servidor rodando em: http://localhost:${PORT}`))
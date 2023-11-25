require("dotenv").config();

const db = require("./db");

const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());

/* Mensagens teste */
app.listen(process.env.PORT, () =>{
    console.log("App está executando");
    db.authenticate();
});

app.get("/", (request, response, next) => {
    response.json({
        message: "Estou vivo!"
    })
})

/* Funções app */
app.delete("/clientes/:id", async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        await db.deleteClientes(id);
        response.sendStatus(204);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
})

app.post("/clientes", async (request,response) => {
    const cliente = request.body;

    try {
        await db.insertClientes(cliente);
        response.sendStatus(201);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.patch("/clientes/:id", async (request,response) => {
    const id = parseInt(request.params.id);
    const cliente = request.body;

    try {
        const clienteUpdate = await db.updateClientes(id, cliente);
        response.json(clienteUpdate);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
})

app.get("/clientes", async (request, response) => {
    try {
        const results = await db.selectAllClientes();
        response.json(results);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
})

app.get("/clientes/:id", async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const results = await db.selectCliente(id);
        response.json(results);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
})

app.get("/login/:usuario/:senha", async (request, response) => {
    try {
        const usuario = request.params.usuario;
        const senha = request.params.senha;

        if(usuario !== 'admin'){
            const results = await db.login(usuario, senha);
            response.json(results);
            return;
        } else {
            if(senha === 'admin') {
                response.json({
                    nome: 'admin',
                });
                return;
            }
        }
    
        response.sendStatus(400);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.post("/produtos", async (request,response) => {
    const produto = request.body;

    try {
        await db.insertProduto(produto);
        response.sendStatus(201);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.get("/produtos", async (request, response) => {
    try {
        const produtos = await db.selectAllProdutos();
        response.json(produtos);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.get("/produtos/destaque", async (request, response) => {
    try {
        const produtos = await db.selectDestaque();
        response.json(produtos);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.post("/finalizar-compra/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const itensPedido = request.body;

    try {
        const pedido = await db.insertPedido(id, itensPedido);
        response.json(pedido);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.get("/pedidos/:id", async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const pedidos = await db.selectAllPedidos(id);
        response.json(pedidos);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.get("/items-pedido/:id", async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const items = await db.selectAllItemPedido(id);
        response.json(items);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

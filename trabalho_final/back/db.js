const {sequelize} = require("./sequelize");
const { Cliente } = require("./modulos/cliente");
const { Login } = require("./modulos/login");
const { Produtos } = require("./modulos/produtos");
const { Pedidos } = require("./modulos/pedidos");
const { ItemPedido } = require("./modulos/ItemPedido");

//const client = mysql.createPool(process.env.CONNECTION_STRING);

async function authenticate(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function selectAllClientes(){
    const clientes = await Cliente.findAll();
    return clientes;
}

async function selectCliente(id){
    const cliente = await Cliente.findOne({
        where: {
            codigo_cliente: id
        }
    });
    return cliente;
}

async function insertClientes(data){
    const cliente = await Cliente.create({
        nome: data.nome,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        cep: data.cep,
    });

    await Login.create({
        usuario: data.usuario,
        senha: data.senha,
        codigo_cliente: cliente.codigo_cliente
    })
}

async function updateClientes(id, novoCliente){
    const cliente = await Cliente.findOne({
        where: {
            codigo_cliente: id,
        }
    });

    await cliente.update(
        {
            nome: novoCliente.nome,
            rua: novoCliente.rua,
            numero: novoCliente.numero,
            complemento: novoCliente.complemento,
            bairro: novoCliente.bairro,
            cidade: novoCliente.cidade,
            uf: novoCliente.uf,
            cep: novoCliente.cep,
        }
    );

    await cliente.save();

    if(novoCliente.senha) {
        await Login.update(
            {
                senha: novoCliente.senha
            },
            {
                where: {
                    codigo_cliente: id
                }
            }
        )
    }

    return cliente;
}

async function deleteClientes(id){
    await User.destroy({
        where: {
            id: id
        }
    });
}

async function login(usuario, senha){
    const login = await Login.findOne({
        where: {
            usuario: usuario,
            senha: senha,
        }
    });

    const cliente = await Cliente.findOne({
        where: {
            codigo_cliente: login.codigo_cliente
        }
    });

    return cliente;
}

async function insertProduto(data){
    await Produtos.create({
        descricao: data.descricao,
        preco: data.preco,
        imagem: data.imagem,
    });
}

async function selectAllProdutos(){
    const produtos = await Produtos.findAll();

    return produtos;
}

async function selectDestaque(){
    const produtos = await Produtos.findAll({
        limit: 2,
        order: [
            ['codigo_produto', 'DESC'],
        ]
    });

    return produtos;
}

async function insertPedido(id, itensPedido){
    const total = itensPedido.reduce((acc, item)=>{
        return acc += item.total_item;
    }, 0);

    const pedido = await Pedidos.create({
        codigo_cliente: id,
        total: total,
    });

    for (const item of itensPedido) {
        await ItemPedido.create({
            codigo_pedido: pedido.codigo_pedido,
            sequencial: item.sequencial,
            codigo_produto: item.codigo_produto,
            quantidade: item.quantidade,
            total_item: item.total_item,
        });
    }

    return pedido;
}

async function selectAllPedidos(id){
    const pedidos = await Pedidos.findAll({
        where: {
            codigo_cliente: id
        }
    });

    return pedidos;
}

async function selectAllItemPedido(id){
    const ItemsPedido = await ItemPedido.findAll({
        where: {
            codigo_pedido: id
        },
        order: [
            ['sequencial', 'DESC']
        ],
        include: { model: Produtos }
    });

    return ItemsPedido;
}

module.exports = {
    authenticate,
    selectAllClientes,
    selectCliente,
    insertClientes,
    updateClientes,
    deleteClientes,
    login,
    insertProduto,
    selectAllProdutos,
    selectDestaque,
    insertPedido,
    selectAllPedidos,
    selectAllItemPedido
}
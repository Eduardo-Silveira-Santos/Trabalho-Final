const url = new URL(window.location.href);
const codigoPedido = url.searchParams.get('codigo_pedido');

if(!codigoPedido) {
  window.location.href = 'pedidos';
}

function admin() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);

  if(cliente.nome === 'admin'){
    window.href('usuarios');
  }
}

function validarCliente() {
  const cliente = localStorage.getItem("cliente");

  if(!cliente){
    const link = document.getElementById("link-usuario");
    link.innerText = "Login/Cadastro";
    link.href = "login-cadastro";
  } else {
    admin();
  }
}
validarCliente();

function adicionarItemTabela(item){
  const linha = document.createElement("tr");
  
  const tdCodigoPedido = document.createElement("td");
  const tdProduto = document.createElement("td");
  const tdQuantidade = document.createElement("td");
  const tdTotalItem = document.createElement("td");

  tdCodigoPedido.innerText = item.codigo_pedido;
  
  tdProduto.innerText = item.produto.descricao;

  tdQuantidade.innerText = item.quantidade;

  tdTotalItem.innerText = item.total_item;

  linha.appendChild(tdCodigoPedido);
  linha.appendChild(tdProduto);
  linha.appendChild(tdQuantidade);
  linha.appendChild(tdTotalItem);

  document.querySelector('#tbody-pedido').appendChild(linha);
}

function preencherTabela() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);

  fetch(`http://localhost:3001/items-pedido/${codigoPedido}`, {
    method: 'get',
  }).then((response) => { 
    response.json().then((pedidos)=>{
      pedidos.forEach((pedido) => {
        adicionarItemTabela(pedido)
      });
    })
  });
}

preencherTabela();

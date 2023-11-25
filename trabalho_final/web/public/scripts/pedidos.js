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
  const tdPedido = document.createElement("td");
  const tdCliente = document.createElement("td");
  const tdTotal = document.createElement("td");

  tdPedido.innerText = item.codigo_pedido;
  
  tdCliente.innerText = item.codigo_cliente;

  tdTotal.innerText = `$${item.total}`;

  linha.appendChild(tdPedido);
  linha.appendChild(tdCliente);
  linha.appendChild(tdTotal);

  linha.style.cursor = 'pointer';

  linha.addEventListener('click', ()=>{
    const url = new URL('http://localhost:3000/pedido');
    url.searchParams.set('codigo_pedido', item.codigo_pedido);
    
    window.location.href = url.href;
  })

  document.querySelector('#tbody-pedidos').appendChild(linha);
}

function preencherTabela() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);

  fetch(`http://localhost:3001/pedidos/${cliente.codigo_cliente}`, {
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

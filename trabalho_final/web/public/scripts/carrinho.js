function admin() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);

  if(cliente.nome === 'admin'){
    const nav = document.querySelector('nav');

    const adminLink = document.createElement('a');
    adminLink.href = 'cadastrarProduto';
    adminLink.innerText = 'Cadastrar Produtos';

    nav.appendChild(adminLink)
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
  const tdCodigo = document.createElement("td");
  const tdDescricao = document.createElement("td");
  const tdQuantidade = document.createElement("td");
  const quantidade = document.createElement("span");
  const buttonAdd = document.createElement("button");
  const buttonRemove = document.createElement("button");
  const tdPreco = document.createElement("td");

  tdCodigo.innerText = item.produto.codigo_produto;
  
  tdDescricao.innerText = item.produto.descricao;
  
  
  buttonAdd.innerText = '+';
  tdQuantidade.appendChild(buttonAdd);

  buttonAdd.addEventListener('click', ()=>{
    const carrinhoString = localStorage.getItem('carrinho');
    const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];

    let produtoAchado = carrinho.find((produto)=>{
      return produto.produto.codigo_produto === item.produto.codigo_produto;
    })

    if(produtoAchado) {
      produtoAchado.quantidade += 1;
    } else {
      produtoAchado = {
        produto: item,
        quantidade: 1,
      };
      carrinho.push(produtoAchado);
    }

    quantidade.innerText = produtoAchado.quantidade;
    tdPreco.innerText = `$${produtoAchado.quantidade * produtoAchado.produto.preco}`;

    const total = carrinho.reduce((acc, item)=>{
      return acc += item.quantidade * item.produto.preco;
    }, 0);

    document.getElementById('valorFinal').innerText = `$${total}`;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  })

  buttonRemove.addEventListener('click', ()=>{
    const carrinhoString = localStorage.getItem('carrinho');
    const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];

    let produtoAchado = carrinho.find((produto)=>{
      return produto.produto.codigo_produto === item.produto.codigo_produto;
    })

    if(produtoAchado) {
      produtoAchado.quantidade -= 1;

      if(produtoAchado.quantidade < 1) {
        document.querySelector('tbody').removeChild(linha);
      } else {
        quantidade.innerText = produtoAchado.quantidade;
        tdPreco.innerText = `$${produtoAchado.quantidade * produtoAchado.produto.preco}`;
      }
    } else { 
      document.querySelector('tbody').removeChild(linha);
    }

    const total = carrinho.reduce((acc, item)=>{
      return acc += item.quantidade * item.produto.preco;
    }, 0);

    document.getElementById('valorFinal').innerText = `$${total}`;

    localStorage.setItem('carrinho', JSON.stringify(carrinho.filter(item=>item.quantidade>0)));
  })

  quantidade.innerText = item.quantidade;
  quantidade.style.color = "#000";
  tdQuantidade.appendChild(quantidade);

  buttonRemove.innerText = '-';
  tdQuantidade.appendChild(buttonRemove);
  
  tdPreco.innerText = `$${item.produto.preco * item.quantidade}`;

  linha.appendChild(tdCodigo);
  linha.appendChild(tdDescricao);
  linha.appendChild(tdQuantidade);
  linha.appendChild(tdPreco);

  document.querySelector('tbody').appendChild(linha);
}

function preencherTabela() {
  const carrinhoString = localStorage.getItem('carrinho');
  const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];

  let valorFinal = 0;

  carrinho.forEach((item) => {
    adicionarItemTabela(item);
    
    valorFinal += item.produto.preco * item.quantidade;
  });

  document.getElementById('valorFinal').innerText = `$${valorFinal}`;
}
preencherTabela();

function onClickFinalizar() {
  const clienteString = localStorage.getItem('cliente');

  if(!clienteString) {
    abrirModal();
    return;
  }

  const cliente = JSON.parse(clienteString);

  if(cliente.nome === 'admin') {
    window.alert('Admin não pode fazer compras');
    return;
  }

  const carrinhoString = localStorage.getItem('carrinho');
  const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];

  if(carrinho.length < 1) {
    return;
  }

  const itensPedido = carrinho.map((item, index)=>{
    return {
      sequencial: index,
      codigo_produto: item.produto.codigo_produto,
      quantidade: item.quantidade,
      total_item: item.produto.preco * item.quantidade
    }
  });

  fetch(`http://localhost:3001/finalizar-compra/${cliente.codigo_cliente}`, {
    method: 'POST',
    body: JSON.stringify(itensPedido),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if(response.status >= 200 && response.status < 400){
      window.location.href = 'finalizar';
      localStorage.removeItem('carrinho');
    } 
  });
}

function onClickLimpar() {
  localStorage.removeItem('carrinho');
  window.location.reload();
}

function abrirModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
  const loginCadastro = document.getElementById('loginCadastro');
  loginCadastro.style.display = 'unset';
  const login = document.getElementById('login');
  login.style.display = 'none';
  const cadastro = document.getElementById('cadastro');
  cadastro.style.display = 'none';
}

function fecharModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function abrirLoginCadastro() {
  const loginCadastro = document.getElementById('loginCadastro');
  loginCadastro.style.display = 'unset';
  const login = document.getElementById('login');
  login.style.display = 'none';
  const cadastro = document.getElementById('cadastro');
  cadastro.style.display = 'none';
}

function abrirLogin() {
  const loginCadastro = document.getElementById('loginCadastro');
  loginCadastro.style.display = 'none';
  const login = document.getElementById('login');
  login.style.display = 'unset';
  const cadastro = document.getElementById('cadastro');
  cadastro.style.display = 'none';
}

function abrirCadastro() {
  const loginCadastro = document.getElementById('loginCadastro');
  loginCadastro.style.display = 'none';
  const login = document.getElementById('login');
  login.style.display = 'none';
  const cadastro = document.getElementById('cadastro');
  cadastro.style.display = 'unset';
}

function onSubmitLogin(event) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const valores = Object.fromEntries(data);

  fetch(`http://localhost:3001/login/${valores.usuario}/${valores.senha}`, {
    method: 'get',
  }).then((response) => { 
    response.json().then((json)=>{
      localStorage.setItem("cliente", JSON.stringify(json));

      onClickFinalizar();
    })
  });
}

document.getElementById('acessarForm').addEventListener('submit', onSubmitLogin)

function onSubmitCadastrar(event) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const valores = Object.fromEntries(data);

  fetch('http://localhost:3001/clientes', {
    method: 'POST',
    body: JSON.stringify(valores),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => { 
    abrirLogin();
  });
}

document.getElementById('cadastroForm').addEventListener('submit', onSubmitCadastrar);

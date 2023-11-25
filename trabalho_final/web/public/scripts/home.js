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

function adicionarProduto(produto) {
  const div = document.createElement('div');
  div.style.marginBottom = '15px';

  const img = document.createElement('img');
  img.src = produto.imagem;
  img.classList.add('img-produto');

  const h3 = document.createElement('h3');
  h3.innerText = produto.descricao;

  const preco = document.createElement('p');
  preco.innerText = `Preço: $${produto.preco}`;

  const buttonAdd = document.createElement('button');
  buttonAdd.innerText = 'Adicionar ao Carrinho';
  buttonAdd.addEventListener('click', () => {
    const carrinhoString = localStorage.getItem('carrinho');
    
    const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];


    const produtoAchado = carrinho.find((item)=>{
      return item.produto.codigo_produto === produto.codigo_produto;
    })

    if(produtoAchado) {
      produtoAchado.quantidade += 1;
    } else {
      carrinho.push({
        produto,
        quantidade: 1,
      });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.alert("Você adicionou um item ao carrinho")
  })

  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(preco);
  div.appendChild(buttonAdd);

  document.querySelector('.destaques').appendChild(div);
}

function carregarProdutos() {
  fetch(`http://localhost:3001/produtos/destaque`, {
    method: 'get',
  }).then((response) => { 
    response.json().then((produtos)=>{
      produtos.forEach((produto) => {
        adicionarProduto(produto)
      });
    })
  });
}

carregarProdutos();

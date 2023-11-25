function validarCliente() {
  const cliente = localStorage.getItem("cliente");

  if(!cliente){
    window.location.href = `login-cadastro`
  }
}
validarCliente();

function admin() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);

  if(cliente.nome === 'admin'){
    const nav = document.querySelector('nav');

    const adminLink = document.createElement('a');
    adminLink.href = 'cadastrarProduto';
    adminLink.innerText = 'Cadastrar Produtos';

    nav.appendChild(adminLink)

    document.getElementById('rua').parentElement.style.display = 'none';
    document.getElementById('numero').parentElement.style.display = 'none';
    document.getElementById('complemento').parentElement.style.display = 'none';
    document.getElementById('bairro').parentElement.style.display = 'none';
    document.getElementById('cidade').parentElement.style.display = 'none';
    document.getElementById('uf').parentElement.style.display = 'none';
    document.getElementById('cep').parentElement.style.display = 'none';
    document.getElementById('atualizarBotao').style.display = 'none';
  }
}
admin();

// ----------------------------------------

function completarDados() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);

  const campoNome = document.getElementById('nome');
  campoNome.innerText = cliente.nome;
  
  const campoRua = document.getElementById('rua');
  campoRua.innerText = cliente.rua;
  
  const campoNumero = document.getElementById('numero');
  campoNumero.innerText = cliente.numero;
  
  const campoComplemento = document.getElementById('complemento');
  campoComplemento.innerText = cliente.complemento;
  
  const campoBairro = document.getElementById('bairro');
  campoBairro.innerText = cliente.bairro;
  
  const campoCidade = document.getElementById('cidade');
  campoCidade.innerText = cliente.cidade;
  
  const campoUf = document.getElementById('uf');
  campoUf.innerText = cliente.uf;
  
  const campoCep = document.getElementById('cep');
  campoCep.innerText = cliente.cep;
}

completarDados();

function onClickSair() {
  localStorage.removeItem('cliente')
  window.location.href = 'login-cadastro';
}
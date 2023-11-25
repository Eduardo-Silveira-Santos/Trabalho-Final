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
  }
}
admin();

function completarDados() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);

  const campoNome = document.getElementById('cadastrarNome');
  campoNome.value = cliente.nome;
  
  const campoRua = document.getElementById('cadastrarRua');
  campoRua.value = cliente.rua;
  
  const campoNumero = document.getElementById('cadastrarNumero');
  campoNumero.value = cliente.numero;
  
  const campoComplemento = document.getElementById('cadastrarComplemento');
  campoComplemento.value = cliente.complemento;
  
  const campoBairro = document.getElementById('cadastrarBairro');
  campoBairro.value = cliente.bairro;
  
  const campoCidade = document.getElementById('cadastrarCidade');
  campoCidade.value = cliente.cidade;
  
  const campoUf = document.getElementById('cadastrarUf');
  campoUf.value = cliente.uf;
  
  const campoCep = document.getElementById('cadastrarCep');
  campoCep.value = cliente.cep;
}

completarDados();

function onSubmit(event) {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);

  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const valores = Object.fromEntries(data);

  fetch(`http://localhost:3001/clientes/${cliente.codigo_cliente}`, {
    method: 'PATCH',
    body: JSON.stringify(valores),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => { 
    response.json().then((json)=>{
      console.log({json});
      localStorage.setItem("cliente", JSON.stringify(json));
      window.location.href = 'usuarios';
    });
  });
}

document.getElementById('cadastroForm').addEventListener('submit', onSubmit)
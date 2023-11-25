function onSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const valores = Object.fromEntries(data);

  fetch(`http://localhost:3001/login/${valores.usuario}/${valores.senha}`, {
    method: 'get',
  }).then((response) => { 
    response.json().then((json)=>{
      localStorage.setItem("cliente", JSON.stringify(json));

      window.location.href = `/`
    })
  });
}

function usuarioJaLogado() {
  const cliente = localStorage.getItem("cliente");

  if(cliente){
    window.location.href = `/`
  }
}

usuarioJaLogado();

document.getElementById('acessarForm').addEventListener('submit', onSubmit)
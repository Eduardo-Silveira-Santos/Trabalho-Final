const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'site.html');
  res.sendFile(filePath);
});

app.get('/login-cadastro', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'loginCadastro.html');
  res.sendFile(filePath);
});

app.get('/acessar', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'acessar.html');
  res.sendFile(filePath);
});

app.get('/cadastrar', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'cadastrar.html');
  res.sendFile(filePath);
});

app.get('/cadastrarProduto', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'cadastrarProduto.html');
  res.sendFile(filePath);
});

app.get('/carrinho', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'carrinho.html');
  res.sendFile(filePath);
});

app.get('/finalizar', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'finalizar.html');
  res.sendFile(filePath);
});

app.get('/produtos', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'produtos.html');
  res.sendFile(filePath);
});

app.get('/usuarioPatch', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'usuarioPatch.html');
  res.sendFile(filePath);
});

app.get('/usuarios', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'usuarios.html');
  res.sendFile(filePath);
});

app.get('/pedidos', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'pedidos.html');
  res.sendFile(filePath);
});

app.get('/pedido', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'pedido.html');
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const express = require('express'); // Importando o Pacote Express
const bodyParser = require('body-parser'); // Colocando pacote Bodyparser 
const cors = require('cors');  // Importando o pacote CORS

const app = express(); // Chama o Express para a função App

// Habilita CORS para todas as origens
app.use(cors());  // Ou você pode usar app.use(cors({ origin: 'http://localhost:5173' })) para limitar a origem

// Usando body-parser para entender o corpo das requisições em JSON
app.use(bodyParser.json());

const usuarios = [];

// Rota para obter todos os usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Rota para obter um usuario específico por id //
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: 'Usuario não encontrado.' });
    }
});

// Rota para cadastrar um novo usuario
app.post('/usuarios', (req, res) => {
    const { id, nome, senha, email } = req.body;
    const usuario = { id, nome, senha, email };
    usuarios.push(usuario);
    res.status(201).json({ message: 'Usuario cadastrado com sucesso.' });
});

// Rota para atualizar as informações de um usuario
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, senha, email } = req.body;
    const usuario = usuarios.find(u => u.id === id); // Encontra o usuário pelo ID
    
    if (usuario) {
        usuario.nome = nome || usuario.nome;
        usuario.senha = senha || usuario.senha;
        usuario.email = email || usuario.email;
        res.json({ message: 'Informações do usuario atualizadas com sucesso.' });
    } else {
        res.status(404).json({ message: 'Usuario não encontrado.' });
    }
});

// Rota para deletar as informações de um usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex !== -1) {
        usuarios.splice(usuarioIndex, 1);
        res.json({ message: 'usuario excluído com sucesso.' });
    } else {
        res.status(404).json({ message: 'usuario não encontrado.' });
    }
});
// Escutando na porta 3000, em localhost:3000
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
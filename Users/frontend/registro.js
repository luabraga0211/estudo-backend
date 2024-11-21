const usuarios = []; // Lista global de usuários

// Função para obter todos os usuários
function getUsuarios(req, res) {
  res.json(usuarios);
}

// Função para obter um usuário por ID
function getUsuariosById(req, res) {
  const { id } = req.params;
  const usuario = usuarios.find(u => u.id === id); // Encontra o usuário pelo ID
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

// Função para criar um novo usuário
function createUsuarios(req, res) {
  const { id, nome, senha, email } = req.body;
  const novoUsuario = { id, nome, senha, email }; // Cria um novo usuário
  usuarios.push(novoUsuario); // Adiciona o novo usuário à lista
  res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
}

// Função para atualizar um usuário existente
function updateUsuarios(req, res) {
  const { id } = req.params; // Obtém o ID do usuário a ser atualizado
  const { nome, senha, email } = req.body;
  const usuario = usuarios.find(u => u.id === id); // Encontra o usuário pelo ID
  if (usuario) {
    usuario.nome = nome || usuario.nome; // Atualiza as informações do usuário
    usuario.senha = senha || usuario.senha;
    usuario.email = email || usuario.email;
    res.json({ message: 'Informações do usuário atualizadas com sucesso.' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

// Função para excluir um usuário
function deleteUsuarios(req, res) {
  const { id } = req.params; // Obtém o ID do usuário a ser excluído
  const usuarioIndex = usuarios.findIndex(u => u.id === id); // Encontra o índice do usuário na lista
  if (usuarioIndex !== -1) {
    usuarios.splice(usuarioIndex, 1); // Remove o usuário da lista
    res.json({ message: 'Usuário excluído com sucesso.' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

module.exports = { getUsuarios, getUsuariosById, createUsuarios, updateUsuarios, deleteUsuarios };
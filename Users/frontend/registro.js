const usuarios = []; // Lista global de usuários

function getUsuarios(req, res) {
  res.json(usuarios);
}

function getUsuariosById(req, res) {
  const { id } = req.params;
  const usuario = usuarios.find(v => v.id === id); // Corrigido para 'usuario'
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

function createUsuarios(req, res) {
  const { id, nome, senha, email } = req.body;
  const novoUsuario = { id, nome, senha, email }; // Renomeado para 'novoUsuario'
  usuarios.push(novoUsuario); // Adiciona o novo usuário à lista
  res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
}

function updateUsuarios(req, res) {
  const { id } = req.params; // Corrigido para 'id'
  const { nome, senha, email } = req.body;
  const usuario = usuarios.find(v => v.id === id); // Corrigido para 'usuario'
  if (usuario) {
    usuario.nome = nome || usuario.nome; // Atualiza os dados do usuário
    usuario.senha = senha || usuario.senha;
    usuario.email = email || usuario.email;
    res.json({ message: 'Informações do usuário atualizadas com sucesso.' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

function deleteUsuarios(req, res) {
  const { id } = req.params; // Corrigido para 'id'
  const usuarioIndex = usuarios.findIndex(v => v.id === id); // Corrigido para 'usuarioIndex'
  if (usuarioIndex !== -1) {
    usuarios.splice(usuarioIndex, 1); // Remove o usuário da lista
    res.json({ message: 'Usuário excluído com sucesso.' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

module.exports = { getUsuarios, getUsuariosById, createUsuarios, updateUsuarios, deleteUsuarios };
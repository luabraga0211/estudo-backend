import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// Criando a const para o App principal, setando a data e o usuario em lista
const App = () => {
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    senha: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false); // Controla se estamos editando ou criando

  useEffect(() => {
    // Carrega os usuarios ao montar o componente
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => { // Pega os dados dos usuarios
  // Função para carregar os usuários da API
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Função para lidar com a mudança nos inputs do formulário
  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Função para criar um novo usuário
  const handleCreateUsuarios = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/usuarios', formData); //posta os dados apos serem criados
      setFormData({
        id: '',
        nome: '',
        senha: '',
        email: ''
      });
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };
  // Função para atualizar um usuário existente
  const handleUpdateUsuarios = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/usuarios/${formData.id}`, formData); //atualiza os dados do usuario
      setFormData({
        id: '',
        nome: '',
        senha: '',
        email: ''
      });
      setIsEditing(false);
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };
    // Função para deletar um usuário
  const handleDeleteUsuarios = async id => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`); // apaga o usuario utilizando o id de usuarios
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };
   // Função para editar um usuário
  const handleEditUsuarios = usuario => {
    setFormData({
      id: usuario.id,
      nome: usuario.nome,
      senha: usuario.senha,
      email: usuario.email
    });
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <form onSubmit={isEditing ? handleUpdateUsuarios : handleCreateUsuarios}>
        <label>
          id:
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            disabled={isEditing} // Desabilita o id durante a edição
          />
        </label>
        <label>
          nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
        </label>
        <label>
          senha:
          <input
            type="text"
            name="senha" // Imputs
            value={formData.senha}
            onChange={handleInputChange}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            name="email" 
            value={formData.email} 
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <ul>
        {usuarios.map(usuario => ( // Mapeamento
          <li key={usuario.id}>
            {usuario.id} - {usuario.nome} - {usuario.senha} - {usuario.email}
            <button onClick={() => handleEditUsuarios(usuario)}>Editar</button>
            <button onClick={() => handleDeleteUsuarios(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <ul>
        <h1>Projeto feito por Luã e Vitor Soligo</h1>
      </ul>
    </div>
  );
};

export default App;
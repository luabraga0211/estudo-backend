import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUsuarios = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/usuarios', formData);
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

  const handleUpdateUsuarios = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/usuarios/${formData.id}`, formData);
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

  const handleDeleteUsuarios = async id => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`); // Corrigido para usar "id"
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

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
            disabled={isEditing} // Desabilita a placa durante a edição
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
            name="senha" // Corrigido para "senha"
            value={formData.senha}
            onChange={handleInputChange}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            name="email" // Corrigido para "email"
            value={formData.email} // Corrigido para "formData.email"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <ul>
        {usuarios.map(usuario => ( // Corrigido para "usuarios"
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
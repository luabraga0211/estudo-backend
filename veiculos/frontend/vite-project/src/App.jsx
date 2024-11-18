import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [veiculos, setVeiculos] = useState([]); // Lista de veículos
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: ''
  });
  const [isEditing, setIsEditing] = useState(false); // Controla se estamos editando ou criando

  useEffect(() => {
    // Carrega os veículos ao montar o componente
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/veiculos');
      setVeiculos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateVeiculos = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/veiculos', formData);
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        ano: ''
      });
      fetchVeiculos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateVeiculos = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/veiculos/${formData.placa}`, formData);
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        ano: ''
      });
      setIsEditing(false);
      fetchVeiculos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVeiculos = async placa => {
    try {
      await axios.delete(`http://localhost:3000/veiculos/${placa}`);
      fetchVeiculos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditVeiculo = veiculo => {
    setFormData({
      placa: veiculo.placa,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano
    });
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Veículos</h1>
      <form onSubmit={isEditing ? handleUpdateVeiculos : handleCreateVeiculos}>
        <label>
          Placa:
          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleInputChange}
            disabled={isEditing} // Desabilita a placa durante a edição
          />
        </label>
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ano:
          <input
            type="text"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <ul>
        {veiculos.map(veiculo => (
          <li key={veiculo.placa}>
            {veiculo.placa} - {veiculo.marca} - {veiculo.modelo} - {veiculo.ano}
            <button onClick={() => handleEditVeiculo(veiculo)}>Editar</button>
            <button onClick={() => handleDeleteVeiculos(veiculo.placa)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
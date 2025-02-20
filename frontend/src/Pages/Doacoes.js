import React, { useState, useEffect } from 'react';

import AddClothingForm from '../components/AddClothingForm'; // Importe o componente do formulário
import ClothingTable from '../components/ClothingTable';
import axios from 'axios';

function Doacoes() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [clothes, setClothes] = useState([]); // Estado para armazenar as roupas

  // Carregar todas as doações ao inicializar o componente
  useEffect(() => {
    axios.get('http://localhost:8080/doacoes') // Alterei a porta para 8080
      .then((response) => {
        setClothes(response.data.doacoes); // Atualiza o estado com as doações da API
      })
      .catch((error) => {
        console.error('Erro ao carregar as doações:', error);
      });
  }, []); // Executa apenas uma vez quando o componente é montado

  const handleToggleForm = () => {
    setIsFormVisible((prev) => !prev); // Alterna a visibilidade do formulário
  };

  const addClothing = (clothing) => {
    console.log("Dados enviados ao adicionar doação:", clothing);
  
    if (!clothing.nome || !clothing.quantidade || !clothing.tamanho) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }
  
    axios.post('http://localhost:8080/doacoes', clothing)
    .then((response) => {
      console.log("Resposta da API ao adicionar doação:", response.data);
      setClothes((prevClothes) => [
        ...prevClothes,
        { ...clothing, id: response.data.id }, // Usa o ID retornado
      ]);
      alert('Doação adicionada com sucesso!');
    })
    .catch((err) => {
      console.error('Erro ao adicionar a doação:', err);
      alert('Erro ao adicionar a doação.');
    });  
  };
  
  const removeClothing = (id) => {
    if (!id) {
      console.error("ID não fornecido para remoção!");
      return;
    }
  
    axios.delete(`http://localhost:8080/doacoes/${id}`)
      .then(() => {
        setClothes((prevClothes) => prevClothes.filter((item) => item.id !== id));
        alert('Doação removida com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao remover a doação:', error);
        alert('Erro ao remover a doação.');
      });
  };
  
  return (
    <div>
      {/* Botão para mostrar/ocultar o formulário */}
      <button onClick={handleToggleForm} style={styles.button}>
        {isFormVisible ? 'Fechar Formulário' : 'Adicionar Doação'}
      </button>

      {/* O formulário será exibido apenas quando isFormVisible for true */}
      {isFormVisible && <AddClothingForm addClothing={addClothing} />}

      {/* Tabela de doações */}
      <ClothingTable clothes={clothes} onRemoveClothing={removeClothing} />
    </div>
  );
}

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#2e6399',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '4px',
    marginBottom: '20px',
  },
};

export default Doacoes;
import React, { useState } from 'react';
import AddClothingForm from './AddClothingForm'; // Importe o componente do formulário

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleToggleForm = () => {
    setIsFormVisible((prev) => !prev); // Alterna a visibilidade do formulário
  };

  const addClothing = (clothing) => {
    console.log('Nova roupa adicionada:', clothing);
  };

  return (
    <div>
      {/* Botão para mostrar/ocultar o formulário */}
      <button onClick={handleToggleForm} style={styles.button}>
        {isFormVisible ? 'Fechar Formulário' : 'Adicionar Roupa'}
      </button>

      {/* O formulário será exibido apenas quando isFormVisible for true */}
      {isFormVisible && <AddClothingForm addClothing={addClothing} />}
    </div>
  );
}

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#002147',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '4px',
    marginBottom: '20px',
  },
};

export default App;

import React, { useState } from 'react';

function AddClothingForm({ addClothing }) {
  const [clothing, setClothing] = useState({
    nome: '',
    descricao: '',
    quantidade: 0,
    tamanho: '', // Novo campo para armazenar o tamanho
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClothing({ ...clothing, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addClothing(clothing);
    setClothing({ nome: '', descricao: '', quantidade: 0, tamanho: '' }); // Limpar o formulário
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={clothing.nome}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label>Tamanho:</label>
        <select
          name="tamanho"
          value={clothing.tamanho}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Selecione o tamanho</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
        </select>
      </div>
      <div style={styles.inputContainer}>
        <label>Quantidade:</label>
        <input
          type="number"
          name="quantidade"
          value={clothing.quantidade}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <button  class="add" type="submit" style={styles.button}>Adicionar</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '300px',
    margin: '0 auto',
  },
  inputContainer: {
    marginBottom: '10px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },

};

export default AddClothingForm;

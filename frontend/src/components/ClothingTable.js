function ClothingTable({ clothes, onRemoveClothing }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tamanho</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {clothes.map((clothing) => (
          <tr key={clothing.id}>
            <td>{clothing.nome}</td>
            <td>{clothing.tamanho}</td>
            <td>{clothing.quantidade}</td>
            <td style={{ textAlign: 'center' }}> {/* Centraliza o botão dentro da célula */}
              <button onClick={() => {
                console.log("ID da doação para remover:", clothing.id);
                onRemoveClothing(clothing.id);
              }}>
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ClothingTable;

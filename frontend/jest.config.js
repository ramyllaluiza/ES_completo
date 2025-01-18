module.exports = {
  testEnvironment: "jsdom", // Usa o ambiente jsdom para testes de interação com o DOM
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transforma arquivos JS/JSX/TS/TSX usando babel-jest
    "^.+\\.css$": "jest-transform-stub"     // Mocka arquivos CSS para evitar erro de importação
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"  // Mapeia arquivos CSS para um mock vazio
  },
  setupFiles: ['<rootDir>/jest.setup.js'], // Configura o arquivo de setup
};

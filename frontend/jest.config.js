module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.css$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // Permite que o axios seja transformado
  ],
  globals: {
    "babel-jest": {
      useESModules: true,
    },
  },
};

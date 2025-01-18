module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '^react-router-dom$': require.resolve('react-router-dom'),
    },
  };
  
// jest.setup.js
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

require("@testing-library/jest-dom");

// Definindo IS_REACT_ACT_ENVIRONMENT no global
global.IS_REACT_ACT_ENVIRONMENT = true;

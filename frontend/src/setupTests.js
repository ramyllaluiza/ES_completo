import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
// Adiciona TextEncoder e TextDecoder como polifills globalmente
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

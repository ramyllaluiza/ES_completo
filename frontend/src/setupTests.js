import { TextEncoder, TextDecoder } from 'util';

// Adiciona TextEncoder e TextDecoder como polifills globalmente
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

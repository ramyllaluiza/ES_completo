import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bem-vindo ao Meu Site de Doações/i);
  expect(linkElement).toBeInTheDocument();
});

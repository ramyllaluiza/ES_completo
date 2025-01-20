import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Componente App', () => {
  test('não renderiza nome do usuário inicialmente', () => {
    render(<App />);
    // Certifique-se de que o texto "nome do usuário" não existe no estado inicial
    expect(screen.queryByText(/nome do usuário/i)).toBeNull();
  });

  test('renderiza os links do menu lateral', () => {
    render(<App />);
    // Verifica se os links estão presentes no DOM
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Doações')).toBeInTheDocument();
  });

  test('renderiza mensagem inicial corretamente', () => {
    render(<App />);
    // Verifica se a mensagem inicial está presente
    expect(screen.getByText('Bem-vindo ao Meu Site de Doações!')).toBeInTheDocument();
    expect(screen.getByText('Explore nossa plataforma e gerencie seu inventário de roupas de forma fácil e rápida.')).toBeInTheDocument();
  });

  test('verifica se as rotas estão funcionando', () => {
    render(<App />);
    // Verifica se a rota padrão (Home) renderiza corretamente
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});

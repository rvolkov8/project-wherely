import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../components/header/Header';

describe('Header', () => {
  test('renders correct links when currentPath is "/"', () => {
    render(
      <MemoryRouter>
        <Header currentPath="/" />
      </MemoryRouter>
    );

    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders correct links when currentPath is "/about"', () => {
    render(
      <MemoryRouter>
        <Header currentPath="/about" />
      </MemoryRouter>
    );

    expect(screen.getByText('Back to levels')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  test('renders correct links and level items when currentPath matches levelPathRegEx', () => {
    const currentLevelItems = {
      1: { name: 'Item 1', url: 'https://example.com/item1' },
      2: { name: 'Item 2', url: 'https://example.com/item2' },
    };

    render(
      <MemoryRouter>
        <Header currentPath="/level/1" currentLevelItems={currentLevelItems} />
      </MemoryRouter>
    );

    expect(screen.getByText('Back to levels')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});

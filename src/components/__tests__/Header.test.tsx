import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('should render the title', () => {
    render(<Header />);
    expect(screen.getByText('Scrabble Word Builder')).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<Header />);
    expect(screen.getByText('Find the highest scoring word from your letter rack')).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });
});

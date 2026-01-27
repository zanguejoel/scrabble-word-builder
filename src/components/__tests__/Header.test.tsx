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

  it('should render the help tooltip button', () => {
    render(<Header />);
    expect(screen.getByLabelText('How to use this app')).toBeInTheDocument();
  });

  it('should have gradient styling on title', () => {
    render(<Header />);
    const title = screen.getByText('Scrabble Word Builder');

    expect(title).toHaveClass('bg-gradient-to-r');
    expect(title).toHaveClass('from-amber-400');
    expect(title).toHaveClass('text-transparent');
  });

  it('should display emojis in subtitle', () => {
    render(<Header />);
    const subtitle = screen.getByText('Find the highest scoring word from your letter rack');
    expect(subtitle.parentElement?.textContent).toContain('✨');
    expect(subtitle.parentElement?.textContent).toContain('🎯');
  });

  it('should have responsive text sizing', () => {
    render(<Header />);
    const title = screen.getByText('Scrabble Word Builder');

    expect(title).toHaveClass('text-4xl');
    expect(title).toHaveClass('md:text-5xl');
  });
});

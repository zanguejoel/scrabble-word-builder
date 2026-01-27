import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultDisplay from '../ResultDisplay';
import { LetterDataMap } from '../../types';

describe('ResultDisplay', () => {
  const mockLetterData: LetterDataMap = {
    C: { score: 3, count: 2 },
    A: { score: 1, count: 9 },
    T: { score: 1, count: 6 },
    W: { score: 4, count: 2 },
    O: { score: 1, count: 8 },
    R: { score: 1, count: 6 },
    D: { score: 2, count: 4 },
  };

  it('should render nothing when result is null', () => {
    const { container } = render(<ResultDisplay result={null} letterData={mockLetterData} />);
    expect(container.firstChild).toBeNull();
  });

  it('should display error message when result has error', () => {
    render(<ResultDisplay result={{ error: 'No valid word found' }} letterData={mockLetterData} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('No valid word found')).toBeInTheDocument();
  });

  it('should display success message when word is found', () => {
    render(<ResultDisplay result={{ bestWord: { word: 'CAT', score: 5 }, allWords: [{ word: 'CAT', score: 5 }], totalFound: 1 }} letterData={mockLetterData} />);
    expect(screen.getByText('Best Word Found!')).toBeInTheDocument();
  });

  it('should display word score', () => {
    render(<ResultDisplay result={{ bestWord: { word: 'CAT', score: 5 }, allWords: [{ word: 'CAT', score: 5 }], totalFound: 1 }} letterData={mockLetterData} />);
    expect(screen.getByText('Score: 5 points')).toBeInTheDocument();
  });

  it('should display letter breakdown', () => {
    render(<ResultDisplay result={{ bestWord: { word: 'CAT', score: 5 }, allWords: [{ word: 'CAT', score: 5 }], totalFound: 1 }} letterData={mockLetterData} />);

    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();

    // Check scores are displayed
    expect(screen.getByText('3')).toBeInTheDocument(); // C score
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(2); // A and T scores
  });

  it('should display letter breakdown for WORD', () => {
    render(<ResultDisplay result={{ bestWord: { word: 'WORD', score: 8 }, allWords: [{ word: 'WORD', score: 8 }], totalFound: 1 }} letterData={mockLetterData} />);

    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('O')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();

    expect(screen.getByText('4')).toBeInTheDocument(); // W score
    expect(screen.getByText('2')).toBeInTheDocument(); // D score
  });

  it('should handle result with null letterData', () => {
    render(<ResultDisplay result={{ bestWord: { word: 'CAT', score: 5 }, allWords: [{ word: 'CAT', score: 5 }], totalFound: 1 }} letterData={null} />);

    expect(screen.getByText('Best Word Found!')).toBeInTheDocument();
    expect(screen.getByText('Score: 5 points')).toBeInTheDocument();
  });

  it('should display validation checkmarks for success', () => {
    render(<ResultDisplay result={{ bestWord: { word: 'CAT', score: 5 }, allWords: [{ word: 'CAT', score: 5 }], totalFound: 1 }} letterData={mockLetterData} />);

    expect(screen.getByText('Valid dictionary word')).toBeInTheDocument();
    expect(screen.getByText('Tiles within limits')).toBeInTheDocument();
    expect(screen.getByText('Uses available letters')).toBeInTheDocument();
    expect(screen.getByText('Highest possible score')).toBeInTheDocument();
  });

  it('should render error state with proper styling', () => {
    const { container } = render(
      <ResultDisplay result={{ error: 'Some error' }} letterData={mockLetterData} />
    );

    const errorDiv = container.querySelector('.bg-red-900\\/30');
    expect(errorDiv).toBeInTheDocument();
  });

  it('should render success state with proper styling', () => {
    const { container } = render(
      <ResultDisplay result={{ bestWord: { word: 'CAT', score: 5 }, allWords: [{ word: 'CAT', score: 5 }], totalFound: 1 }} letterData={mockLetterData} />
    );

    const successDiv = container.querySelector('.from-green-900\\/40');
    expect(successDiv).toBeInTheDocument();
  });

  it('should handle high-scoring words', () => {
    render(<ResultDisplay result={{ bestWord: { word: 'CAT', score: 100 }, allWords: [{ word: 'CAT', score: 100 }], totalFound: 1 }} letterData={mockLetterData} />);
    expect(screen.getByText('Score: 100 points')).toBeInTheDocument();
  });

  it('should handle single word with repeated letters', () => {
    const letterData: LetterDataMap = {
      D: { score: 2, count: 4 },
      O: { score: 1, count: 8 },
      R: { score: 1, count: 6 },
    };

    render(<ResultDisplay result={{ bestWord: { word: 'DOOR', score: 5 }, allWords: [{ word: 'DOOR', score: 5 }], totalFound: 1 }} letterData={letterData} />);

    expect(screen.getByText('D')).toBeInTheDocument();
    // O appears twice in DOOR
    const oElements = screen.getAllByText('O');
    expect(oElements.length).toBe(2);
    expect(screen.getByText('R')).toBeInTheDocument();
  });

  it('should handle missing letter data gracefully', () => {
    const limitedLetterData: LetterDataMap = {
      C: { score: 3, count: 2 },
    };

    render(<ResultDisplay result={{ bestWord: { word: 'CAT', score: 3 }, allWords: [{ word: 'CAT', score: 3 }], totalFound: 1 }} letterData={limitedLetterData} />);

    expect(screen.getByText('Best Word Found!')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('should display multiple valid words', () => {
    const multiWordResult = {
      bestWord: { word: 'WORD', score: 8 },
      allWords: [
        { word: 'WORD', score: 8 },
        { word: 'ROW', score: 6 },
        { word: 'OWL', score: 6 }
      ],
      totalFound: 10
    };

    render(<ResultDisplay result={multiWordResult} letterData={mockLetterData} />);

    expect(screen.getByText('Best Word Found!')).toBeInTheDocument();
    expect(screen.getByText('Score: 8 points')).toBeInTheDocument();
    expect(screen.getByText('Other Valid Words')).toBeInTheDocument();
    expect(screen.getByText('10 total found')).toBeInTheDocument();
    expect(screen.getByText('ROW')).toBeInTheDocument();
    expect(screen.getByText('OWL')).toBeInTheDocument();
  });

  it('should not display other words section when only one word found', () => {
    const singleWordResult = {
      bestWord: { word: 'CAT', score: 5 },
      allWords: [{ word: 'CAT', score: 5 }],
      totalFound: 1
    };

    render(<ResultDisplay result={singleWordResult} letterData={mockLetterData} />);

    expect(screen.getByText('Best Word Found!')).toBeInTheDocument();
    expect(screen.queryByText('Other Valid Words')).not.toBeInTheDocument();
  });
});

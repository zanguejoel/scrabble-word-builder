import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HelpTooltip from '../HelpTooltip';

describe('HelpTooltip', () => {
  it('should render the help button', () => {
    render(<HelpTooltip />);
    expect(screen.getByLabelText('How to use this app')).toBeInTheDocument();
  });

  it('should not show tooltip initially', () => {
    render(<HelpTooltip />);
    expect(screen.queryByText('How to Use')).not.toBeInTheDocument();
  });

  it('should show tooltip on button click', async () => {
    render(<HelpTooltip />);
    const button = screen.getByLabelText('How to use this app');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('How to Use')).toBeInTheDocument();
    });
  });

  it('should hide tooltip on second click', async () => {
    render(<HelpTooltip />);
    const button = screen.getByLabelText('How to use this app');

    // Open tooltip
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('How to Use')).toBeInTheDocument();
    });

    // Close tooltip
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByText('How to Use')).not.toBeInTheDocument();
    });
  });

  it('should display all instruction steps', async () => {
    render(<HelpTooltip />);
    const button = screen.getByLabelText('How to use this app');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('1. Enter Your Rack')).toBeInTheDocument();
      expect(screen.getByText('2. Add Board Letters (Optional)')).toBeInTheDocument();
      expect(screen.getByText('3. Find Best Word')).toBeInTheDocument();
    });
  });

  it('should display instruction details', async () => {
    render(<HelpTooltip />);
    const button = screen.getByLabelText('How to use this app');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Click the keyboard letters or type 1-7 letters/)).toBeInTheDocument();
      expect(screen.getByText(/Enter any letters already on the board/)).toBeInTheDocument();
      expect(screen.getByText(/highest-scoring word and all other valid words/)).toBeInTheDocument();
    });
  });

  it('should display dictionary info', async () => {
    render(<HelpTooltip />);
    const button = screen.getByLabelText('How to use this app');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Uses official Scrabble tile counts/)).toBeInTheDocument();
      expect(screen.getByText(/178,000\+ word dictionary/)).toBeInTheDocument();
    });
  });

  it('should close tooltip when clicking outside', async () => {
    render(
      <div>
        <HelpTooltip />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    const button = screen.getByLabelText('How to use this app');

    // Open tooltip
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('How to Use')).toBeInTheDocument();
    });

    // Click outside
    const outsideElement = screen.getByTestId('outside');
    fireEvent.mouseDown(outsideElement);

    await waitFor(() => {
      expect(screen.queryByText('How to Use')).not.toBeInTheDocument();
    });
  });

  it('should show tooltip on hover when not locked', async () => {
    render(<HelpTooltip />);
    const button = screen.getByLabelText('How to use this app');

    fireEvent.mouseEnter(button);

    await waitFor(() => {
      expect(screen.getByText('How to Use')).toBeInTheDocument();
    });
  });

  it('should hide tooltip on mouse leave when not locked', async () => {
    render(<HelpTooltip />);
    const button = screen.getByLabelText('How to use this app');

    // Hover to show
    fireEvent.mouseEnter(button);
    await waitFor(() => {
      expect(screen.getByText('How to Use')).toBeInTheDocument();
    });

    // Leave to hide
    fireEvent.mouseLeave(button);
    await waitFor(() => {
      expect(screen.queryByText('How to Use')).not.toBeInTheDocument();
    });
  });

  it('should not hide tooltip on mouse leave when locked by click', async () => {
    render(<HelpTooltip />);
    const button = screen.getByLabelText('How to use this app');

    // Click to lock open
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('How to Use')).toBeInTheDocument();
    });

    // Mouse leave should not hide it
    fireEvent.mouseLeave(button);

    // Wait a bit and check it's still visible
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(screen.getByText('How to Use')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BoardWordInput from '../BoardWordInput';

describe('BoardWordInput', () => {
  it('should render the input field', () => {
    render(<BoardWordInput value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('e.g., WIZ')).toBeInTheDocument();
  });

  it('should render the label', () => {
    render(<BoardWordInput value="" onChange={vi.fn()} />);
    expect(screen.getByText(/Word on Board \(Optional\)/)).toBeInTheDocument();
    expect(screen.getByText(/Build upon an existing word/)).toBeInTheDocument();
  });

  it('should display the current value', () => {
    render(<BoardWordInput value="WIZ" onChange={vi.fn()} />);
    const input = screen.getByPlaceholderText('e.g., WIZ') as HTMLInputElement;
    expect(input.value).toBe('WIZ');
  });

  it('should call onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<BoardWordInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('e.g., WIZ');
    await user.type(input, 'w');

    expect(handleChange).toHaveBeenCalledWith('W');
  });

  it('should convert input to uppercase', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<BoardWordInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('e.g., WIZ');
    await user.type(input, 'wiz');

    // userEvent.type calls onChange for each character typed
    expect(handleChange).toHaveBeenCalledWith('W');
    expect(handleChange).toHaveBeenCalledWith('I');
    expect(handleChange).toHaveBeenCalledWith('Z');
  });

  it('should display error message when error is provided', () => {
    render(<BoardWordInput value="" onChange={vi.fn()} error="Board word must contain only letters" />);
    expect(screen.getByText('Board word must contain only letters')).toBeInTheDocument();
  });

  it('should not display error message when no error', () => {
    render(<BoardWordInput value="" onChange={vi.fn()} />);
    expect(screen.queryByText('Board word must contain only letters')).not.toBeInTheDocument();
  });

  it('should allow empty value', () => {
    render(<BoardWordInput value="" onChange={vi.fn()} />);
    const input = screen.getByPlaceholderText('e.g., WIZ') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should apply error styles when error is provided', () => {
    render(<BoardWordInput value="" onChange={vi.fn()} error="Some error" />);
    const input = screen.getByPlaceholderText('e.g., WIZ');
    expect(input).toHaveClass('border-red-500');
  });

  it('should apply normal styles when no error', () => {
    render(<BoardWordInput value="" onChange={vi.fn()} />);
    const input = screen.getByPlaceholderText('e.g., WIZ');
    expect(input).toHaveClass('border-slate-600');
  });

  it('should handle long board words', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<BoardWordInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('e.g., WIZ');
    await user.type(input, 'wizard');

    // Each character is typed individually
    expect(handleChange).toHaveBeenCalledTimes(6);
    expect(handleChange).toHaveBeenLastCalledWith('D');
  });
});

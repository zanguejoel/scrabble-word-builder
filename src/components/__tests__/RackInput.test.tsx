import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RackInput from '../RackInput';

describe('RackInput', () => {
  it('should render the input field', () => {
    render(<RackInput value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('e.g., AIDOORW')).toBeInTheDocument();
  });

  it('should render the label', () => {
    render(<RackInput value="" onChange={vi.fn()} />);
    expect(screen.getByText(/Your Letter Rack/)).toBeInTheDocument();
    expect(screen.getByText(/\(1-7 letters\)/)).toBeInTheDocument();
  });

  it('should display the current value', () => {
    render(<RackInput value="CAT" onChange={vi.fn()} />);
    const input = screen.getByPlaceholderText('e.g., AIDOORW') as HTMLInputElement;
    expect(input.value).toBe('CAT');
  });

  it('should call onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RackInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('e.g., AIDOORW');
    await user.type(input, 'c');

    expect(handleChange).toHaveBeenCalledWith('C');
  });

  it('should convert input to uppercase', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RackInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('e.g., AIDOORW');
    await user.type(input, 'cat');

    // userEvent.type calls onChange for each character typed
    expect(handleChange).toHaveBeenCalledWith('C');
    expect(handleChange).toHaveBeenCalledWith('A');
    expect(handleChange).toHaveBeenCalledWith('T');
  });

  it('should display character count', () => {
    render(<RackInput value="CAT" onChange={vi.fn()} />);
    expect(screen.getByText('3 / 7')).toBeInTheDocument();
  });

  it('should display character count for empty value', () => {
    render(<RackInput value="" onChange={vi.fn()} />);
    expect(screen.getByText('0 / 7')).toBeInTheDocument();
  });

  it('should display character count for max length', () => {
    render(<RackInput value="AIDOORW" onChange={vi.fn()} />);
    expect(screen.getByText('7 / 7')).toBeInTheDocument();
  });

  it('should display error message when error is provided', () => {
    render(<RackInput value="" onChange={vi.fn()} error="Rack must contain only letters" />);
    expect(screen.getByText('Rack must contain only letters')).toBeInTheDocument();
  });

  it('should not display error message when no error', () => {
    render(<RackInput value="" onChange={vi.fn()} />);
    expect(screen.queryByText('Rack must contain only letters')).not.toBeInTheDocument();
  });

  it('should display help text when no error', () => {
    render(<RackInput value="" onChange={vi.fn()} />);
    expect(screen.getByText('Enter letters A-Z only')).toBeInTheDocument();
  });

  it('should not display help text when error is shown', () => {
    render(<RackInput value="" onChange={vi.fn()} error="Some error" />);
    expect(screen.queryByText('Enter letters A-Z only')).not.toBeInTheDocument();
  });

  it('should have maxLength attribute set to 7', () => {
    render(<RackInput value="" onChange={vi.fn()} />);
    const input = screen.getByPlaceholderText('e.g., AIDOORW') as HTMLInputElement;
    expect(input.maxLength).toBe(7);
  });

  it('should apply error styles when error is provided', () => {
    render(<RackInput value="" onChange={vi.fn()} error="Some error" />);
    const input = screen.getByPlaceholderText('e.g., AIDOORW');
    expect(input).toHaveClass('border-red-500');
  });

  it('should apply normal styles when no error', () => {
    render(<RackInput value="" onChange={vi.fn()} />);
    const input = screen.getByPlaceholderText('e.g., AIDOORW');
    expect(input).toHaveClass('border-slate-600');
  });
});

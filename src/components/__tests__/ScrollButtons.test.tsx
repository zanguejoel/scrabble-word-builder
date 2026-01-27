import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollButtons from '../ScrollButtons';

describe('ScrollButtons', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    window.scrollY = 0;
  });

  it('should not render buttons when page is at top', () => {
    render(<ScrollButtons />);

    // Buttons should not be visible initially
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Scroll to bottom')).not.toBeInTheDocument();
  });

  it('should show buttons after scrolling down more than 300px', () => {
    const { rerender } = render(<ScrollButtons />);

    // Simulate scroll event
    window.scrollY = 400;
    fireEvent.scroll(window);

    // Force re-render to reflect state change
    rerender(<ScrollButtons />);

    // Buttons should now be visible
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
    expect(screen.getByLabelText('Scroll to bottom')).toBeInTheDocument();
  });

  it('should call scrollTo when scroll to top button is clicked', () => {
    window.scrollY = 400;
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<ScrollButtons />);
    fireEvent.scroll(window);

    const scrollToTopButton = screen.getByLabelText('Scroll to top');
    fireEvent.click(scrollToTopButton);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('should call scrollTo when scroll to bottom button is clicked', () => {
    window.scrollY = 400;
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    Object.defineProperty(document.body, 'scrollHeight', {
      value: 2000,
      configurable: true
    });

    render(<ScrollButtons />);
    fireEvent.scroll(window);

    const scrollToBottomButton = screen.getByLabelText('Scroll to bottom');
    fireEvent.click(scrollToBottomButton);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 2000,
      behavior: 'smooth'
    });
  });

  it('should have proper styling classes', () => {
    window.scrollY = 400;
    render(<ScrollButtons />);
    fireEvent.scroll(window);

    const scrollToTopButton = screen.getByLabelText('Scroll to top');
    const scrollToBottomButton = screen.getByLabelText('Scroll to bottom');

    expect(scrollToTopButton).toHaveClass('bg-amber-500');
    expect(scrollToBottomButton).toHaveClass('bg-slate-600');
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ScrollButtons />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

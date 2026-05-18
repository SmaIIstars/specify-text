import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { ErrorBoundary, ErrorBoundaryProps } from '../error-boundary';

const ThrowOnRender: React.FC<{ shouldThrow?: boolean }> = ({
  shouldThrow = true,
}) => {
  if (shouldThrow) {
    throw new Error('Test render error');
  }
  return <span data-testid="safe-content">all good</span>;
};

const ToggleWrapper: React.FC<{
  initialThrow?: boolean;
  errorBoundaryProps?: Partial<ErrorBoundaryProps>;
}> = ({ initialThrow = true, errorBoundaryProps }) => {
  const [key, setKey] = useState(0);
  const [shouldThrow, setShouldThrow] = useState(initialThrow);

  return (
    <div>
      <button
        data-testid="reset"
        onClick={() => {
          setKey((k) => k + 1);
          setShouldThrow(false);
        }}
      >
        Reset
      </button>
      <ErrorBoundary key={key} {...errorBoundaryProps}>
        <ThrowOnRender shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
};

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <span data-testid="child">hello</span>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeTruthy();
  });

  it('renders null as default fallback on error', () => {
    // Suppress React's error log in the test console for expected errors
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>
    );

    expect(screen.queryByTestId('safe-content')).toBeNull();
    spy.mockRestore();
  });

  it('renders custom fallback ReactNode on error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<span data-testid="fallback">fallback ui</span>}>
        <ThrowOnRender />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('fallback')).toBeTruthy();
    spy.mockRestore();
  });

  it('renders custom fallback function on error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary
        fallback={(error) => (
          <span data-testid="fallback-fn">{error.message}</span>
        )}
      >
        <ThrowOnRender />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('fallback-fn').textContent).toBe(
      'Test render error'
    );
    spy.mockRestore();
  });

  it('calls onError when error is caught', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onError = vi.fn();

    render(
      <ErrorBoundary onError={onError}>
        <ThrowOnRender />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
    spy.mockRestore();
  });

  it('resets error state when key changes', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <ErrorBoundary key={1}>
        <ThrowOnRender shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error state is active, fallback is null (default)
    expect(screen.queryByTestId('safe-content')).toBeNull();

    // Change key and stop throwing — simulates recovery
    rerender(
      <ErrorBoundary key={2}>
        <ThrowOnRender shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('safe-content')).toBeTruthy();
    spy.mockRestore();
  });
});

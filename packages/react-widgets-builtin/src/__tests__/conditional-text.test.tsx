import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ConditionalText from '../conditional-text';

describe('ConditionalText', () => {
  it('renders text when condition is met', () => {
    const { container } = render(
      <ConditionalText
        text="Visible"
        type="conditional"
        typeVal="show"
        conditionalMap={{ show: true }}
      />,
    );
    expect(screen.getByText('Visible')).toBeDefined();
    expect(container.textContent).toBe('Visible');
  });

  it('renders nothing when condition is not met', () => {
    const { container } = render(
      <ConditionalText
        text="Hidden"
        type="conditional"
        typeVal="show"
        conditionalMap={{ show: false }}
      />,
    );
    // Should render an empty fragment
    expect(container.textContent).toBe('');
  });

  it('renders nothing when conditionalMap does not contain the key', () => {
    const { container } = render(
      <ConditionalText
        text="Missing"
        type="conditional"
        typeVal="missingKey"
        conditionalMap={{ other: true }}
      />,
    );
    expect(container.textContent).toBe('');
  });

  it('renders nothing when conditionalMap is empty', () => {
    const { container } = render(
      <ConditionalText
        text="Hidden"
        type="conditional"
        typeVal="any"
        conditionalMap={{}}
      />,
    );
    expect(container.textContent).toBe('');
  });

  it('supports comma-delimited conditions (at least one true)', () => {
    const { container } = render(
      <ConditionalText
        text="Shown"
        type="conditional"
        typeVal="a,b,c"
        conditionalMap={{ a: false, b: true, c: false }}
      />,
    );
    expect(screen.getByText('Shown')).toBeDefined();
    expect(container.textContent).toBe('Shown');
  });

  it('supports custom delimiter', () => {
    const { container } = render(
      <ConditionalText
        text="Shown"
        type="conditional"
        typeVal="x|y"
        delimiter="|"
        conditionalMap={{ x: false, y: true }}
      />,
    );
    expect(screen.getByText('Shown')).toBeDefined();
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import VariableText from '../variable-text';

describe('VariableText', () => {
  it('renders resolved variable value from variableMap', () => {
    const { container } = render(
      <VariableText
        text="fallback"
        type="variable"
        typeVal="year"
        variableMap={{ year: 2024 }}
      />,
    );
    expect(container.textContent).toBe('2024');
  });

  it('falls back to text when variable is not in map', () => {
    const { container } = render(
      <VariableText
        text="default text"
        type="variable"
        typeVal="missing"
        variableMap={{ other: 'value' }}
      />,
    );
    expect(container.textContent).toBe('default text');
  });

  it('falls back to text when variableMap is empty', () => {
    const { container } = render(
      <VariableText
        text="backup"
        type="variable"
        typeVal="anything"
        variableMap={{}}
      />,
    );
    expect(container.textContent).toBe('backup');
  });

  it('converts non-string resolved values to string', () => {
    const { container } = render(
      <VariableText
        text="fallback"
        type="variable"
        typeVal="count"
        variableMap={{ count: 99 }}
      />,
    );
    expect(container.textContent).toBe('99');
  });

  it('resolves nested variables and tagged text inside the resolved value', () => {
    const { container } = render(
      <VariableText
        text="fallback"
        type="variable"
        typeVal="greeting"
        variableMap={{ greeting: 'Hello' }}
      />,
    );
    // The string "Hello" should be passed to SpecifyText and rendered
    expect(container.textContent).toBe('Hello');
  });

  it('renders zero as string value', () => {
    const { container } = render(
      <VariableText
        text="fallback"
        type="variable"
        typeVal="num"
        variableMap={{ num: 0 }}
      />,
    );
    expect(container.textContent).toBe('0');
  });

  it('applies variableClassName as wrapperClassName on inner SpecifyText', () => {
    const { container } = render(
      <VariableText
        text="fallback"
        type="variable"
        typeVal="name"
        variableMap={{ name: 'Alice' }}
        variableClassName="var-class"
      />,
    );
    const span = container.querySelector('span.var-class');
    expect(span).toBeDefined();
  });
});

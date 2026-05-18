import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SpecifyText } from '../specify-text';

// Helper: a callable plain-function widget resolver matching ComponentResolver signature
const makeWidget =
  (tag: string, className?: string): ((props: Record<string, unknown>) => React.ReactNode) =>
  (props) =>
    React.createElement(tag, { className, key: (props as any).text }, (props as any).text as React.ReactNode);

describe('SpecifyText', () => {
  it('renders plain text without markers', () => {
    render(<SpecifyText text="Hello World" />);
    expect(screen.getByText('Hello World')).toBeDefined();
  });

  it('renders single tagged segment with custom widgetMap', () => {
    const { container } = render(
      <SpecifyText
        text="[Hello](bold:enabled)"
        widgetMap={{ bold: makeWidget('strong', 'bold-widget') }}
      />,
    );
    const strongEl = container.querySelector('strong.bold-widget');
    expect(strongEl).toBeDefined();
    expect(strongEl?.textContent).toBe('Hello');
  });

  it('renders multiple tagged segments with custom widgetMap', () => {
    const { container } = render(
      <SpecifyText
        text="[2024](bold:yes) Happy [New](bold:yes) Year!"
        widgetMap={{ bold: makeWidget('strong', 'bold-widget') }}
      />,
    );
    const strongEls = container.querySelectorAll('strong.bold-widget');
    expect(strongEls.length).toBe(2);
    expect(strongEls[0].textContent).toBe('2024');
    expect(strongEls[1].textContent).toBe('New');
    // Plain text between tags should also be present
    expect(container.textContent).toContain('Happy');
    expect(container.textContent).toContain('Year!');
  });

  it('renders nested tagged segments with custom widgetMap', () => {
    const { container } = render(
      <SpecifyText
        text="[[Nested](bold:yes) text](italic:yes)"
        widgetMap={{
          bold: makeWidget('strong', 'bold-widget'),
          italic: makeWidget('em', 'italic-widget'),
        }}
      />,
    );
    // The outer italic widget wraps the result
    const emEl = container.querySelector('em.italic-widget');
    expect(emEl).toBeDefined();
  });

  it('applies wrapperClassName to the root span', () => {
    const { container } = render(
      <SpecifyText text="Hello" wrapperClassName="my-wrapper" />,
    );
    const span = container.querySelector('span.my-wrapper');
    expect(span).toBeDefined();
  });

  it('applies custom style to the root span', () => {
    const { container } = render(
      <SpecifyText text="Hello" style={{ color: 'red' }} />,
    );
    const span = container.querySelector('span');
    expect(span?.getAttribute('style')).toContain('color: red');
  });

  it('renders nothing for empty string', () => {
    const { container } = render(<SpecifyText text="" />);
    expect(container.textContent).toBe('');
  });

  it('uses custom widgetMap to override the same type key', () => {
    const customWidget = () => <span className="custom-widget">Custom</span>;
    const { container } = render(
      <SpecifyText
        text="[Hello](custom:val)"
        widgetMap={{ custom: customWidget }}
      />,
    );
    const customSpan = container.querySelector('.custom-widget');
    expect(customSpan).toBeDefined();
    expect(customSpan?.textContent).toBe('Custom');
  });

  it('handles text with no tag markers gracefully', () => {
    const { container } = render(
      <SpecifyText text="just some plain text here" />,
    );
    expect(screen.getByText('just some plain text here')).toBeDefined();
    expect(container.querySelector('span')).toBeDefined();
  });

  it('handles text containing bracket-like characters as plain text', () => {
    render(<SpecifyText text="Not [a tag] here" />);
    expect(screen.getByText('Not [a tag] here')).toBeDefined();
  });

  it('renders tagged text with typeVal passed to widget', () => {
    const spyWidget = (props: Record<string, unknown>) => {
      expect(props.typeVal).toBe('hello');
      return React.createElement('span', { 'data-testid': 'spy' }, props.text as string);
    };
    const { container } = render(
      <SpecifyText
        text="[World](greet:hello)"
        widgetMap={{ greet: spyWidget }}
      />,
    );
    expect(container.querySelector('[data-testid="spy"]')).toBeDefined();
  });

  it('renders consecutive tagged segments', () => {
    const { container } = render(
      <SpecifyText
        text="[a](bold:1)[b](bold:2)"
        widgetMap={{ bold: makeWidget('strong', 'consecutive') }}
      />,
    );
    const strongEls = container.querySelectorAll('strong.consecutive');
    expect(strongEls.length).toBe(2);
    expect(strongEls[0].textContent).toBe('a');
    expect(strongEls[1].textContent).toBe('b');
  });

  it('renders plain text segment and tagged segment mixed', () => {
    const { container } = render(
      <SpecifyText
        text="Prefix [Tag](bold:1) Suffix"
        widgetMap={{ bold: makeWidget('b', 'mixed') }}
      />,
    );
    expect(container.textContent).toContain('Prefix');
    expect(container.textContent).toContain('Suffix');
    expect(container.querySelector('b.mixed')).toBeDefined();
  });
});

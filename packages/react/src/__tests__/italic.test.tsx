import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import Italic from '../italic';

// Helper: a callable plain-function widget (avoids React.memo which is uncallable)
const makeWidget =
  (tag: string) =>
  (props: Record<string, unknown>) =>
    React.createElement(tag, { key: (props as any).text }, (props as any).text as React.ReactNode);

describe('Italic', () => {
  it('renders text in <i> when typeVal is truthy', () => {
    const { container } = render(
      <Italic text="Hello" typeVal="true" />,
    );
    const i = container.querySelector('i');
    expect(i).toBeDefined();
    expect(i?.textContent).toBe('Hello');
  });

  it('renders text in <span> when typeVal is "false"', () => {
    const { container } = render(
      <Italic text="World" typeVal="false" />,
    );
    expect(container.querySelector('i')).toBeNull();
    const span = container.querySelector('span');
    expect(span).toBeDefined();
    expect(span?.textContent).toBe('World');
  });

  it('renders text in <span> when typeVal is empty string', () => {
    const { container } = render(
      <Italic text="Text" typeVal="" />,
    );
    expect(container.querySelector('i')).toBeNull();
    const span = container.querySelector('span');
    expect(span).toBeDefined();
  });

  it('renders text in <span> when typeVal is undefined', () => {
    const { container } = render(
      <Italic text="Text" />,
    );
    expect(container.querySelector('i')).toBeNull();
    const span = container.querySelector('span');
    expect(span).toBeDefined();
  });

  it('applies italicTextClassName to <i> when typeVal is true', () => {
    const { container } = render(
      <Italic text="Italic" typeVal="true" italicTextClassName="my-italic" />,
    );
    const i = container.querySelector('i.my-italic');
    expect(i).toBeDefined();
  });

  it('applies textClassName to <span> when typeVal is false', () => {
    const { container } = render(
      <Italic text="Normal" typeVal="false" textClassName="my-text" />,
    );
    const span = container.querySelector('span.my-text');
    expect(span).toBeDefined();
  });

  it('renders nested tagged text via SpecifyText with custom widgetMap', () => {
    // Italic spreads {...props} into inner SpecifyText, so widgetMap is forwarded.
    // Use plain-function widgets since the resolver is called as a function internally.
    const { container } = render(
      <Italic
        text="[Bold](strong:true)"
        typeVal="true"
        widgetMap={{ strong: makeWidget('strong') }}
      />,
    );
    const i = container.querySelector('i');
    expect(i).toBeDefined();
    const strong = i?.querySelector('strong');
    expect(strong).toBeDefined();
    expect(strong?.textContent).toBe('Bold');
  });

  it('renders multi-line text with blank lines between lines', () => {
    const text = 'Line1\nLine2';
    const { container } = render(
      <Italic text={text} typeVal="true" />,
    );
    // Each line wrapped in <i>, separated by BlankLine <div>
    const iElements = container.querySelectorAll('i');
    expect(iElements.length).toBe(2);
    const blankDivs = container.querySelectorAll('div');
    expect(blankDivs.length).toBe(1);
  });

  it('renders plain text as-is when not a valid tagged text', () => {
    const { container } = render(
      <Italic text="just plain text" typeVal="true" />,
    );
    const i = container.querySelector('i');
    expect(i).toBeDefined();
    expect(i?.textContent).toBe('just plain text');
  });
});

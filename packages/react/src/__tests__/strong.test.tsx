import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import Strong from '../strong';

const makeWidget =
  (tag: string) =>
  (props: Record<string, unknown>) =>
    React.createElement(tag, { key: (props as any).text }, (props as any).text as React.ReactNode);

describe('Strong', () => {
  it('renders text in <strong> when typeVal is truthy', () => {
    const { container } = render(
      <Strong text="Bold" typeVal="true" />,
    );
    const strong = container.querySelector('strong');
    expect(strong).toBeDefined();
    expect(strong?.textContent).toBe('Bold');
  });

  it('renders text in <span> when typeVal is "false"', () => {
    const { container } = render(
      <Strong text="Normal" typeVal="false" />,
    );
    expect(container.querySelector('strong')).toBeNull();
    const span = container.querySelector('span');
    expect(span).toBeDefined();
    expect(span?.textContent).toBe('Normal');
  });

  it('renders text in <span> when typeVal is empty string', () => {
    const { container } = render(
      <Strong text="Text" typeVal="" />,
    );
    expect(container.querySelector('strong')).toBeNull();
    const span = container.querySelector('span');
    expect(span).toBeDefined();
  });

  it('renders text in <span> when typeVal is undefined', () => {
    const { container } = render(
      <Strong text="Text" />,
    );
    expect(container.querySelector('strong')).toBeNull();
    const span = container.querySelector('span');
    expect(span).toBeDefined();
  });

  it('renders as <strong> when strong prop is true even if typeVal is false', () => {
    const { container } = render(
      <Strong text="Bold" strong={true} typeVal="false" />,
    );
    const strong = container.querySelector('strong');
    expect(strong).toBeDefined();
    expect(strong?.textContent).toBe('Bold');
  });

  it('applies strongTextClassName to <strong> element', () => {
    const { container } = render(
      <Strong text="Bold" typeVal="true" strongTextClassName="my-strong" />,
    );
    const strong = container.querySelector('strong.my-strong');
    expect(strong).toBeDefined();
  });

  it('applies textClassName to <span> when not strong', () => {
    const { container } = render(
      <Strong text="Normal" typeVal="false" textClassName="my-text" />,
    );
    const span = container.querySelector('span.my-text');
    expect(span).toBeDefined();
  });

  it('renders nested tagged text via SpecifyText with custom widgetMap', () => {
    const { container } = render(
      <Strong
        text="[Italic](italic:true)"
        typeVal="true"
        widgetMap={{ italic: makeWidget('em') }}
      />,
    );
    const strong = container.querySelector('strong');
    expect(strong).toBeDefined();
    const em = strong?.querySelector('em');
    expect(em).toBeDefined();
    expect(em?.textContent).toBe('Italic');
  });

  it('renders plain text directly when not a valid tagged text and strong', () => {
    const { container } = render(
      <Strong text="Plain" typeVal="true" />,
    );
    const strong = container.querySelector('strong');
    expect(strong).toBeDefined();
    expect(strong?.textContent).toBe('Plain');
  });
});

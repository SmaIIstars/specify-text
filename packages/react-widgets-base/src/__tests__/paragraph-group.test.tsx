import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import ParagraphGroup from '../paragraph-group';

describe('ParagraphGroup', () => {
  it('renders single line text in a span', () => {
    const { container } = render(
      <ParagraphGroup text="Hello World" />,
    );
    const rootSpan = container.querySelector('span');
    expect(rootSpan).toBeDefined();
    expect(rootSpan?.textContent).toBe('Hello World');
  });

  it('splits multi-line text into multiple spans with blank lines', () => {
    const text = 'Line 1\nLine 2\nLine 3';
    const { container } = render(
      <ParagraphGroup text={text} />,
    );
    // Each line is wrapped in a span child of root span
    const textSpans = container.querySelectorAll('span > span');
    expect(textSpans.length).toBe(3);
    expect(textSpans[0].textContent).toBe('Line 1');
    expect(textSpans[1].textContent).toBe('Line 2');
    expect(textSpans[2].textContent).toBe('Line 3');

    // Blank line divs between paragraphs
    const blankDivs = container.querySelectorAll('div');
    expect(blankDivs.length).toBe(2);
  });

  it('returns nothing when text is empty', () => {
    const { container } = render(
      <ParagraphGroup text="" />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('applies paragraphGroupWrapperClassName to root span', () => {
    const { container } = render(
      <ParagraphGroup
        text="Hello"
        paragraphGroupWrapperClassName="wrapper-class"
      />,
    );
    const wrapper = container.querySelector('span.wrapper-class');
    expect(wrapper).toBeDefined();
  });

  it('applies textClassName to inner text spans', () => {
    const text = 'Line 1\nLine 2';
    const { container } = render(
      <ParagraphGroup
        text={text}
        textClassName="text-class"
      />,
    );
    const textSpans = container.querySelectorAll('span.text-class');
    expect(textSpans.length).toBe(2);
  });

  it('renders single line without blank line dividers', () => {
    const { container } = render(
      <ParagraphGroup text="Single" />,
    );
    const blankDivs = container.querySelectorAll('div');
    expect(blankDivs.length).toBe(0);
  });

  it('applies blankLineClassName to blank line dividers', () => {
    const text = 'A\nB';
    const { container } = render(
      <ParagraphGroup text={text} blankLineClassName="blank-class" />,
    );
    const blankDiv = container.querySelector('div.blank-class');
    expect(blankDiv).toBeDefined();
  });
});

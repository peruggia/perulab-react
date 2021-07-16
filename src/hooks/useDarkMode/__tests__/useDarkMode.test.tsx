import { render, screen } from '@testing-library/react';
import UseDarkModeExample from '../examples/UseDarkModeExample';
import {
  addEventListener,
  eventListeners,
  mediaQuery,
  removeEventListener,
} from '../mocks/matchMedia.mock';

import '../mocks/matchMedia.mock';
import { act } from 'react-dom/test-utils';

describe('Hook -> useDarkMode', () => {
  let unmount: () => void;
  let appearance: HTMLElement;

  beforeEach(() => {
    ({ unmount } = render(<UseDarkModeExample />));
    appearance = screen.getByTestId('appearance');
  });

  it('should start as "light" theme', () => {
    expect(appearance.textContent).toBe('light');
  });

  it('should use the right media query', () => {
    expect(mediaQuery).toBe('(prefers-color-scheme: dark)');
  });

  it('should attach the event listeners', () => {
    expect(addEventListener).toBeCalled();
    expect(eventListeners['change'].length).toBe(1);
  });

  it('should change the theme to "dark" when the browser event fires', () => {
    // makes sure it starts as "light" before changing it
    expect(appearance.textContent).toBe('light');

    // Simulate the query matching
    act(() => {
      eventListeners['change'][0]({ matches: true });
    });

    expect(appearance.textContent).toBe('dark');
  });

  it('should remove the event listeners when unmounted', () => {
    // makes sure it has an event before unmounting
    expect(eventListeners['change'].length).toBe(1);

    unmount();

    expect(removeEventListener).toBeCalled();
    expect(eventListeners['change'].length).toBe(0);
  });
});

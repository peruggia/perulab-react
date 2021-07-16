// Until the present moment, jsdom which is used by Jest, doesn't have a
// native implementation for window.matchMedia().

interface EventListeners {
  [k: string]: (({ matches }: { matches: boolean }) => void)[];
}

const eventListeners: EventListeners = {};

const addEventListener = jest
  .fn()
  .mockImplementation((eventName: string, callback: () => void) => {
    if (!eventListeners[eventName]) {
      eventListeners[eventName] = [callback];
      return;
    }
    eventListeners[eventName].push(callback);
  });

const removeEventListener = jest
  .fn()
  .mockImplementation((eventName: string, callback: () => void) => {
    const index = eventListeners[eventName].indexOf(callback);
    if (index >= 0) {
      eventListeners[eventName].splice(index, 1);
    }
  });

let mediaQuery: string;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    mediaQuery = query;

    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener,
      removeEventListener,
      dispatchEvent: jest.fn(),
    };
  }),
});

export { addEventListener, eventListeners, mediaQuery, removeEventListener };

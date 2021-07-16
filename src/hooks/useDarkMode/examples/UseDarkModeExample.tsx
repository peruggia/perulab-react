import useDarkMode from '../useDarkMode';

// Since we are testing a custom hook,
// this simple example component is necessary
export default function UseDarkModeExample() {
  const isDark = useDarkMode();

  return <p data-testid="appearance">{isDark ? 'dark' : 'light'}</p>;
}

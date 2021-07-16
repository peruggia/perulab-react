import React from 'react';

const matchDark = '(prefers-color-scheme: dark)';

interface WatchMediaEvent {
  matches: boolean;
  media: string;
}

function useDarkMode() {
  const [isDark, setIsDark] = React.useState(
    () => window.matchMedia && window.matchMedia(matchDark).matches
  );

  React.useEffect(() => {
    const matcher = window.matchMedia(matchDark);
    const onChange = ({ matches }: WatchMediaEvent) => setIsDark(matches);

    matcher.addEventListener('change', onChange);

    return () => {
      matcher.removeEventListener('change', onChange);
    };
  });

  return isDark;
}

export default useDarkMode;

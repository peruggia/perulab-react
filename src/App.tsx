import './App.css';
import { Global, ThemeProvider } from '@emotion/react';
import useDarkMode from './hooks/useDarkMode';

const theme = {
  dark: {
    bodyColor: 'rgb(6, 29, 43)',
    color: 'white',
  },
  light: {
    bodyColor: 'white',
    color: 'rgb(6, 29, 43)',
  },
};

function App() {
  const isDarkMode = useDarkMode();
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  return (
    <ThemeProvider theme={currentTheme}>
      <Global
        styles={(theme: any) => {
          return {
            body: {
              backgroundColor: theme.bodyColor,
              color: theme.color,
            },
          };
        }}
      />
      <div className="App">
        <h1>Hello</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;

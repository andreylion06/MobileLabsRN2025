import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { ThemeProvider, ThemeContext } from './theme/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import { useContext } from 'react';

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </StyledThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

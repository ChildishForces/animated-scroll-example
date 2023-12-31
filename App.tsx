import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigator } from './src/containers/Navigator';
import { ScrollContextProvider } from './src/context/ScrollContext';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <ScrollContextProvider>
          <Navigator />
        </ScrollContextProvider>
      </SafeAreaProvider>
    </>
  );
}

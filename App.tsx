import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import {persistor, store} from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <SafeAreaProvider>

      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Navigation />
      </PersistGate>
      
      </Provider>
      
    </SafeAreaProvider>
  )
}
export default App;
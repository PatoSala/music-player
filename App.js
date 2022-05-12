import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './Redux/store';
import { Provider } from 'react-redux'

import MainNavigator from './Resources/Navigators/MainNavigator';

import AudioControls from './Resources/Components/AudioControls';

function AppWrapper() {


  return (
      <NavigationContainer>
        <MainNavigator/>
        <AudioControls/>
      </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppWrapper/>
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

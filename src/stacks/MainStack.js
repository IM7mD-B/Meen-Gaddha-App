import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import BottomTab from '../components/shared/BottomTabs';
import GameScreen from '../screens/gameFlow/GameScreen'

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}        // initialRouteName="Login"
        initialRouteName="GameScreen"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTab} />
        <Stack.Screen name="GameScreen" component={GameScreen} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

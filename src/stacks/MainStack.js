import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import GameInstructions from '../screens/Instrucation/GameInstructions'

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}        // initialRouteName="Login"
      >
        <Stack.Screen name="GameInstructions" component={GameInstructions} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

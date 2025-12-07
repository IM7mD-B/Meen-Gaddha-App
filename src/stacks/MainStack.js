import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import BottomTab from '../components/shared/BottomTabs';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}        // initialRouteName="Login"
        initialRouteName="Home"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTab} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

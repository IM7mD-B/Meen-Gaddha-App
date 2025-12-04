import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import GameSettings from '../screens/GameSetup/GameSettings';
import SplashScreen from '../screens/auth/SplashScreen';
import GameInstructions from '../screens/Instrucation/GameInstructions';
import BottomTab from '../components/shared/BottomTabs';
import SginInScreen from '../screens/auth/SignInScreen'
import SginUpScreen from '../screens/auth/SignUpScreen'
import WelcomeScreen from '../screens/auth/WelcomeScreen'
import ForgetPassword from '../screens/auth/ForgetPassword'
import CategoriesScreen from '../screens/categoriesScreen/CategoriesScreen'
import GameScreen from '../screens/gameFlow/GameScreen'
import SginInScreen from '../screens/auth/SignInScreen'
import SginUpScreen from '../screens/auth/SignUpScreen'
import WelcomeScreen from '../screens/auth/WelcomeScreen'

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}        // initialRouteName="Login"
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="GameInstructions" component={GameInstructions} />
        <Stack.Screen name="GameSettings" component={GameSettings} />
        
        {/* ====== Auth ====== */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignIn" component={SginInScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SginUpScreen} />
        <Stack.Screen name="ForgetPass" component={ForgetPassword} />

        {/* ====== BottomTab ====== */}
        <Stack.Screen name="Home" component={BottomTab} />
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

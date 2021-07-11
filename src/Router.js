import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login.js';
import Register from './components/register.js';
import Home from './components/home.js';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sign In"
          component={Login}
          initial
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;

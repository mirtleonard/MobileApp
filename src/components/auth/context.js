import axios from 'axios';
import React from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthState = React.createContext();
export const AuthDispatch = React.createContext();

export const initialState = {
  user:  SecureStore.getItemAsync('user'),
  token: SecureStore.getItemAsync('token'),
  loading: false,
  errorMessage: null,
}


export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.user,
        token: action.token,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: ""
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

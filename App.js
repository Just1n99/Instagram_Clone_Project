import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add'
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth, onAuthStateChanged, getReactNativePersistence} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { user } from './redux/reducers/user';
const store = configureStore( {
  reducer: {
    userState: user,
  }
});

const firebaseConfig = {
  apiKey: "AIzaSyBSTsZorrn3UWh1Dm_JCB61GnADnmLmnGY",
  authDomain: "instagram-dev-e7b03.firebaseapp.com",
  projectId: "instagram-dev-e7b03",
  storageBucket: "instagram-dev-e7b03.appspot.com",
  messagingSenderId: "766983202359",
  appId: "1:766983202359:web:8f5393f9b7627f8fa381b2",
  measurementId: "G-1N4Z6EBRBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);
const storage = getStorage(app);


const Stack = createStackNavigator();



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded) {
      return(
        <View style= {{flex: 1, justifyContent: "center"}}>
          <Text>Loading...</Text>
        </View>
      )
    }
    if(!loggedIn) {
      return (
          <NavigationContainer>
          <Stack.Navigator initialRouteName="landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="landing">
              <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
              <Stack.Screen name="Add" component={AddScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App

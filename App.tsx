import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/utils/constants/themes';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import AuthStack from './src/Navigation/UnAuthStack';
import AuthenticatedStack from './src/Navigation/AuthStack';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import PushNotification from "react-native-push-notification";
import { withIAPContext } from 'react-native-iap';
import { Platform } from 'react-native';


function Navigation() {
  const {verified} = useSelector((state: any) => state.user);
  const {token} = useSelector((state: any) => state.user);
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {verified && token ? <AuthenticatedStack /> : <AuthStack />}
      </NavigationContainer>
    </ThemeProvider>
  );
}

 function App() {

  const firebaseConfig = {
    apiKey: 'AIzaSyAubR1vlpRcfzpttKDlApVjTqihGyywz8Q',
    authDomain: 'auth-213a3.firebaseapp.com',
    databaseURL: 'https://auth-213a3.firebaseio.com',
    projectId: 'auth-213a3',
    storageBucket: 'auth-213a3.appspot.com',
    messagingSenderId: '244293605303',
    appId: '1:244293605303:android:9344a1f8a90e9b9447ba32',
  };
  if (!firebase?.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },

    
  });
  PushNotification.createChannel(
    {
      channelId: "habits", 
      channelName: "Default Channel", 
      soundName: "default", 
      importance: 4, 
      vibrate: true, 
    },
    (created) => console.log(`Channel created successfully: ${created}`), 
  );
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar style="light" />
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default withIAPContext(App);

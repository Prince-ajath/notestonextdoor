import React from "react";
import { Root } from "native-base";
import AppNavigator from './navigation/AppNavigator';
import { AsyncStorage,Text ,TextInput, Linking, Platform } from 'react-native';
//import firebase from 'react-native-firebase'; 
import messaging from '@react-native-firebase/messaging';

import Listner from "./screens/notifications/Listeners";

import CoinsPop from './components/CoinsPop';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;    
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;    
    console.disableYellowBox = true;
 
  }


  async componentDidMount() {
    
    var self = this;
    messaging().hasPermission().then(fcm_token => {
       if (fcm_token == false) {
         messaging().requestPermission()
           .then(() => {
             // User has authorised  

             messaging().getToken().then(fcm_token => {
              console.log(fcm_token);
              //alert(fcm_token); 
              AsyncStorage.setItem('fcm_token', fcm_token || "");
             }).catch(error => {
             console.log('error');
               console.log(error);
               console.log('error');
            });
            
           })
           .catch(error => {
             // User has rejected permissions  
             alert('Notifications request has been rejected');
           });
       }
      }).catch(error => {
        console.log('error');
          console.log(error);
          console.log('error');
       });
     messaging().getToken().then(fcm_token => {
       console.log(fcm_token);
       AsyncStorage.setItem('fcm_token', fcm_token || "");
      }).catch(error => {
      console.log('error');
        console.log(error);
        console.log('error');
     });



   

  }


 

  _getCurrentRouteName(navState) {
    if (navState.hasOwnProperty('index')) {
      return this._getCurrentRouteName(navState.routes[navState.index]);
    } else {
      return "Current Route Name:", navState.routeName;
    }
  }

  render() {
    return (
      <Root>
        
        <AppNavigator
          />
          <CoinsPop />
      </Root>
    );
  }
}
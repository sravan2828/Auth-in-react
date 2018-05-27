/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';
import { Avatar } from 'react-native-elements';


export default class App extends Component {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      
      apiKey: "AIzaSyAy114Gkbla0-yMi4uHIJFfWVkwTlmYWWg",
      authDomain: "sun-waters.firebaseapp.com",
      databaseURL: "https://sun-waters.firebaseio.com",
      projectId: "sun-waters",
      storageBucket: "sun-waters.appspot.com",
      messagingSenderId: "350028927865"
      
    });

    firebase.auth().onAuthStateChanged((user) => {
      if ( user ){
        this.setState({ loggedIn : true});
      }
      else {
        this.setState({ loggedIn : false});
      }
    });
  }
  renderContent = () => {
    switch (this.state.loggedIn){
      case true: return (
                  <Card>
                    <CardSection>
                      <Avatar
                      large
                      source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                      />
                      <Button onPress={() => firebase.auth().signOut()}>
                        Logout
                      </Button>
                    </CardSection>
                  </Card>
                );
      case false: return <LoginForm />
      default : return (
                  <Card>
                    <CardSection>
                      <Spinner size = "large" />
                    </CardSection>
                  </Card>
                );
    }    
  }
  render() {
    return (
      <View style={{flex: 1}}>
      <Header headerText="Login" />
      {this.renderContent()}
      </View>
    );
  }
}
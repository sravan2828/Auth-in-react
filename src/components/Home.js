import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Card, CardSection } from './common';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import { Dropdown } from 'react-native-material-dropdown';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

class Home extends Component {
    state = {
        noOfCans: 0
    };

    placeOrder = () => {
        var user = firebase.auth().currentUser;
        firebase.database().ref('orders/').push({
            noOfCans: this.state.noOfCans,
            user: user.email
        }).then(() => {
            Toast.show('Order placed');
          })
          .catch((error) =>{
            Toast.show('error placing order');
          });
    }

    onChange = (value, index, data) => {
        this.setState({noOfCans: value});
    }

    render() {
        let data = [{
            value: '1',
          }, {
            value: '2',
          }, {
            value: '3',
          }];
        return(
            <Card>
                <Text>Order:</Text>
                <Dropdown
                    label='Number of Cans'
                    data={data}
                    onChangeText={(value, index, data) => this.onChange(value, index, data)}/>
                <CardSection>
                    <Button onPress={() => this.placeOrder()}>
                        Place order
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => firebase.auth().signOut()}>
                    Logout
                    </Button>
                </CardSection>
            </Card>
        );
    };
}
const styles = StyleSheet.create({
    Title: {
      fontWeight: 'bold',
      fontSize: 30,
    }
  });
export default Home;
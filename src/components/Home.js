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
        
      axios.post(
        'https://webhook.site/c8659e37-146b-4726-ad97-06ba9b4032f0', 
        {
           'noOfCans': this.state.noOfCans
        },
        {
           headers: {
               'api-token': 'xyz',
                //other header fields
           }
        }
    )
    .then(() => {
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
                <CardSection>
                    <Text style={styles.Title}>Balance: 20$</Text>
                </CardSection>
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
    }
}
const styles = StyleSheet.create({
    Title: {
      fontWeight: 'bold',
      fontSize: 30,
    }
  });
export default Home;
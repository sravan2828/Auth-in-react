import React, { Component } from 'react';
import { Button, Card, CardSection } from './common';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';

class Home extends Component{
    render() {
        return(
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
    }
}

export default Home;
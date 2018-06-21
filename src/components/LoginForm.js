import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Toast from 'react-native-simple-toast';

class LoginForm extends Component{
    state = { email: '', password: '', loading: false};

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        //.then(this.onLoginSuccess())
        .catch(() => {
            Toast.show('This is a toast.');
            this.setState({loading: false });
            /* firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginError.bind(this)); */
        });
    }

    renderButton(){
        if(this.state.loading){
            return <Spinner size="small" /> ;
        }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                LOG-IN
            </Button>
        );
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input 
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        label='Email'
                        placeholder="username@gmail.com"
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        label="Password"
                        isPassword={true}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm;
import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component{
    state = { email: '', password: '', error: '', loading: false};

    onButtonPress() {

        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginError.bind(this));
        });
    }

    onLoginSuccess() {
        this.setState({ 
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    onLoginError() {
        this.setState({
            error: 'Authentication failed.',
            loading: false
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
            <ScrollView >
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
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
            </ScrollView>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};
export default LoginForm;
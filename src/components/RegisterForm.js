import React, { Component } from 'react';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class Home extends Component {

    state = { email: '', password: '', rePassword: '', loading: false};

    renderButton = () => {
        if(this.state.loading){
            return <Spinner size="small" /> ;
        }
        return(
            <Button onPress={() => this.registerUser()}>
                Register
            </Button>
        );
    }

    registerUser = () => {
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginError.bind(this));
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
                    <Input 
                        placeholder="re enter password"
                        value={this.state.rePassword}
                        onChangeText={rePassword => this.setState({ rePassword })}
                        label="Password"
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }

}
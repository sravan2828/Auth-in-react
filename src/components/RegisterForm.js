import React, { Component } from 'react';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Toast from 'react-native-simple-toast';
import firebase from 'firebase';

export default class Home extends Component {

    state = {   email: '',
                password: '',
                rePassword: '',
                name: '',
                address: '',
                phone: '',
                loading: false};

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
        const { email, password, rePassword, name, address, phone} = this.state;
        if (email === "" || password === "" || rePassword === "" ||
            name === "" || phone ==="" || address === ""){
            Toast.show("please enter all fields");
        } else {
            if(password === rePassword){
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() =>{ this.updateUser() });
            } else {
                Toast.show("password didn't match in both fields");
            }
        }
    }

    updateUser = () => {
        let user = firebase.auth().currentUser;
        firebase.database().ref('users/'+this.state.phone+"/").set({
            email: user.email,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
        }).then(() => {
            this.onLoginSuccess();
        })
        .catch((error) =>{
           this.onLoginError(error);
        });
        
    }

    onLoginError = (error) => {
        Toast.show("registration Failed");
    }

    onLoginSuccess = () => {
        Toast.show("Registration Successful");
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input 
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        label='Name'
                        placeholder="Enter name here"
                    />
                </CardSection>
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
                        placeholder="99xxxxxxxx"
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                        label="phone"
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        placeholder="type address here"
                        value={this.state.address}
                        onChangeText={address => this.setState({ address })}
                        label="Address"
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        placeholder="********"
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
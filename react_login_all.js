import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import Button from 'react-native-button';
import { GoogleSignin } from 'react-native-google-signin';

import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

export class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.unsubscriber = null
        this.state = {
            isAuthenticated: false,
            typedEmail: '',
            typedPassword: '',
            user: null
        };
    }

    // Change the user
    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser) => {
            this.setState({
                user: changedUser
            })
        });

        // If Googlesignin is undefined
        GoogleSignin.configure({})
            .then(() => {})
            .catch((error) => {console.log(`Google signin configuration = ${error}`);})
    }

    // Change the state of the subscriber back to null
    componentWillUnmount() {
        if(this.unsubscriber) {
            this.unsubscriber();
        }
    }

    onAnonymousLogin = () => {
        firebase.auth().signInAnonymouslyAndRetrieveData()
            .then(() => {
                console.log(`Login successfully.`);
                this.setState({
                    isAuthenticated: true
                });
            })
            .catch((error) => {
                console.log(`Login failed. Error is = ${error}`);
            });
    }

    onRegister = () => {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
                this.state.typedEmail,
                this.state.typedPassword
            )
            .then((loggedInUser) => {
                this.setState({user: loggedInUser});
            })
            .catch((error) => {
                console.log(`Registration failed. Error is = ${error}`);
            });

    }

    onLoginFacebook = () => {
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if(result.isCancelled) {
                    return Promise.reject(new Error('The user cancelled the request'));
                }
                console.log(
                    `Login success with permissions = ${result.grantedPermissions.toString()}`);
                return AccessToken.getCurrentAccessToken();
            })
            .then((data) => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            })
            .then((currentUser) => {
                console.log(`Facebook login with user = ${JSON.stringify(currentUser)}`);
            })
            .catch((error) => {
                console.log(`Login failed. Error = ${error}`);
            })
    }

    onLoginGoogle = () => {
        GoogleSignin
            .signIn()
            .then((data) => {
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            })
            .then((currentUser) => {
                console.log(`Google login with user = ${JSON.stringify(currentUser)}`);
            })
            .catch((error) => {
                console.log(`Login failed. Error = ${error}`);
            })
    }

    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(
                this.state.typedEmail,
                this.state.typedPassword
            )
            .then((loggedInUser) => {
                console.log(`Login with user: ${JSON.stringify(loggedInUser)}`);
            })
            .catch((error) => {
                console.log(`Registration failed. Error is = ${error}`);
            });
    }

    render() {
        return(
            <View style={{ 
                flex:1,
                marginTop: Platform.OS == 'ios' ? 34 : 0,
                alignItems: 'center',
                backgroundColor: '#202020'
            }}
            >
                <Text style={{
                    color:'red',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign:'center'
                }}
                >
                    Login with firebase
                </Text>

                <Button containerStyle={{
                    padding:10,
                    borderRadius:4,
                    backgroundColor: 'rgb(226,161,184)'
                }}
                style={{ fontSize:18, color:'white' }}
                onPress={this.onAnonymousLogin}>
                    Login anonymous
                </Button>

                <Text style={{ margin:20, fontSize:15 }}>{this.state.isAuthenticated ? 'Logged in anonymously' : ''}</Text>

                <TextInput style={{
                    height:40, width:200, margin:10, padding:10,
                    borderColor: 'gray', borderWidth: 1, color: 'black'
                }}
                keyboardType='email-address'
                placeholder='Type your email'
                autoCapitalize='none'
                underlineColorAndroid='transparent'
                onChangeText={
                    (text) => {
                        this.setState({
                            typedEmail: text
                        });
                    }
                }
                />


                <TextInput style={{
                    height:40, width:200, margin:10, padding:10,
                    borderColor: 'gray', borderWidth: 1, color: 'black'
                }}
                keyboardType='default'
                placeholder='Type your password'
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={
                    (text) => {
                        this.setState({
                            typedPassword: text
                        });
                    }
                }
                />

                <View style={{ flexDirection:'column' }}>

                    <View style={{ flexDirection:'row' }}>
                        <Button containerStyle={{
                            padding:10,
                            borderRadius:4,
                            margin:10,
                            backgroundColor: 'mediumseagreen'
                        }}
                        style={{ fontSize:18, color:'white' }}
                        onPress={this.onLogin}>
                            Login
                        </Button>

                        <Button containerStyle={{
                            padding:10,
                            borderRadius:4,
                            margin:10,
                            backgroundColor: 'mediumseagreen'
                        }}
                        style={{ fontSize:18, color:'white' }}
                        onPress={this.onRegister}>
                            Register
                        </Button>
                    </View>


                    <Button containerStyle={{
                        padding:10,
                        borderRadius:4,
                        margin:20,
                        width:150,
                        backgroundColor: 'rgb(73,104,173)'
                    }}
                    style={{ fontSize:18, color:'white' }}
                    onPress={this.onLoginFacebook}>
                        Login using FB
                    </Button>

                    <Button containerStyle={{
                        padding:10,
                        borderRadius:4,
                        margin:20,
                        width:150,
                        backgroundColor: 'red'
                    }}
                    style={{ fontSize:18, color:'white' }}
                    onPress={this.onLoginGoogle}>
                        Login using Gmail
                    </Button>

                </View>

            </View>
        );
    }
}


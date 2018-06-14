import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';


export default class TextInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedText: 'please type your text',
      typedPassword: ''
    };
  }

  render() {

    return(
      <View>
        <TextInput style={ { 
          height: 50,
          margin: 40,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 8,
         } }
         keyboardType='email-address'
         placeholder='Enter your email'
         underlineColorAndroid='transparent'
         onChangeText = {
          (text) => {
            this.setState(
              (previousState) => {
                return {
                  typedText: text
                };
              }
            );
          }
         }
      />
      <Text>{ this.state.typedText }</Text>
      <TextInput style={ {height: 50, margin: 40, borderColor: 'gray', borderWidth: 1, padding: 8} }
      keyboardType='default'
      placeholder='Enter your password'
      secureTextEntry={true}
      onChangeText = {
          (text) => {
            this.setState(
              (previousState) => {
                return {
                  typedPassword: text
                };
              }
            );
          }
         }
      />
      </View>
    );

  }

}


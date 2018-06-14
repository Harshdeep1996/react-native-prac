import React from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';


export default class TextInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedText: 'please type your text',
      typedPassword: ''
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState(() => {
          return { typedText: 'Keyboard is shown' }
        })
    });

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState(() => {
          return { typedText: 'Keyboard is hidden' }
        })
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
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
      onSubmitEditing={Keyboard.dismiss}
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
      <TextInput style={ {height: 100, margin: 20, borderColor: 'gray', borderWidth: 1, padding: 10, textAlignVertical: 'top'} }
      multiline={true}
      // autoFocus={true}
      />
      </View>
    );

  }

}


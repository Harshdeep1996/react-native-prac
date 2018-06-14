import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Blink extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showText: true
      };

      var taskToDo = () => {
        this.setState(
          previousState => {
            return {
              showText: !previousState.showText
            };
          });
      };

      const timeToBlink = 500;
      setInterval(taskToDo, timeToBlink);
    }

    render() {
      let textToDisplay = this.state.showText ? this.props.input : ' ';
      return (
        <Text style={ styles.textInput } >{ textToDisplay }</Text>
      );
    }
}


export default class TextBlink extends React.Component {
  render() {
    return(
      <View
        style={ styles.container }
      >
        <Blink input="This is working!"></Blink>
        <Blink input="This is working 2!"></Blink>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      alignItems: 'center',
      margin: 50
    },
    textInput: {
      color: 'red'
    }
  }
);


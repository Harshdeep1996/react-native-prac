import React from 'react';
import { Alert, StyleSheet, ScrollView,
  View, Text, TextInput, Image, Dimensions} from 'react-native';


export default class ScrollList extends React.Component {

  render() {


    let deviceWidth = Dimensions.get('window').width;
    return(
      <ScrollView style={ { backgroundColor:'#202020' } }
      keyboardDismissMode='on-drag'>
        <Image style={{width: deviceWidth, height: 200, marginTop:24}}
        source={{uri: 'http://dailypost.ng/wp-content/uploads/2015/02/aircraft-02.jpg'}}/>

        <Image style={{width: deviceWidth, height: 200, marginTop:24}}
        source={{uri: 'https://www.piper.com/wp-content/uploads/2017/09/PiperAircraft_ArcherDX_H_Ocean.jpg'}}/>

        <Image style={{width: deviceWidth, height: 200, marginTop:24}}
        source={{uri: 'http://bucurestifm.ro/wp-content/uploads/sites/2/2014/09/Lufthansa-avion.jpg'}}/>

        <Image style={{width: deviceWidth, height: 200, marginTop:24}}
        source={{uri: 'http://dailypost.ng/wp-content/uploads/2015/02/aircraft-02.jpg'}}/>

      </ScrollView>
    );

  }

}


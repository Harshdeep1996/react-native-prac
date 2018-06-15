import React from 'react';
import { Alert, StyleSheet, ScrollView,
  View, Text, TextInput, Image, Dimensions, ViewPagerAndroid} from 'react-native';


export default class ViewPagerExample extends React.Component {

  render() {

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    return(
      <ViewPagerAndroid style={ { flex:1 } } initialPage={0}
      onPageScrollStateChanged={(state) => {
        console.log(`State is changed = ${state}`);
      }}
      onPageSelected={()=>{
        console.log(`Scrolled to page: ${event.nativeEvent.position}`);
      }}>

        <View style={{backgroundColor:'lightseagreen'}}>
          <Text style={ { padding:15, fontSize:20, textAlign:'center'} }>
            Screen 0
          </Text>
        </View>

        <View style={{backgroundColor:'purple'}}>
          <Text style={ { padding:15, fontSize:20, textAlign:'center'} }>
            Screen 1
          </Text>
        </View>

        <View style={{backgroundColor:'blue'}}>
          <Text style={ { padding:15, fontSize:20, textAlign:'center'} }>
            Screen 2
          </Text>
        </View>

      </ViewPagerAndroid>
    );

  }

}


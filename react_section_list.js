import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import sectionListData from './data/sectionListData';
import Swipeout from 'react-native-swipeout';


class SectionListItem extends Component {
    render() {
        return(
            <View style={{ 
                flex: 1, flexDirection:'column', backgroundColor: 'rgb(98,187,184)'
            }}>
                <Text style={{
                    fontSize:16,fontWeight:'bold',
                    marginLeft:20, marginRight:10,
                    color:'rgba(173,252,250)'
                }}
                >
                {this.props.item.name}
                </Text>

                <Text style={{
                    fontSize:16,fontWeight:'bold',
                    marginLeft:20, marginRight:10,
                    color:'rgba(173,252,250)'
                }}
                >
                {this.props.item.description}
                </Text>

                <View style={{ height:1, margin:4, backgroundColor:'#e5e4e2', marginLeft:20, marginRight:10 }}>

                </View>

            </View>
        );
    }   
}

class SectionHeader extends Component {
    render() {
        return(
            <View style={{ flex:1, flexDirection:'column', backgroundColor:'#202020' }}>
                <Text style={{
                    fontSize:16,fontWeight:'bold',
                    margin:20,
                    color:'white'
                }}
                >
                {this.props.section.title}
                </Text>
            </View>
        );
    }
}

export default class BasicSectionList extends React.Component {
    render() {
        return(
            <View style={{ flex:1, marginTop:26 }}>
                <SectionList
                    renderItem={({item, index}) => {
                        return(
                            <SectionListItem item={item} index={index}>

                            </SectionListItem>
                        );
                    }}
                    renderSectionHeader={({section}) => {
                        return(<SectionHeader section={section}/>);
                    }}
                    sections={sectionListData}
                    keyExtractor={(item, index) => item.name}
                >

                </SectionList>
            </View>
        );
    }
}

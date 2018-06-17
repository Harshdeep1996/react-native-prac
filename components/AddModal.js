import React, { Component } from 'react';
import { TextInput, FlatList, Dimensions, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';

import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screenWidth = Dimensions.get('screen').width;

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newFoodName: '',
            newFoodDescription: ''
        };
    }

    showAddModal = () => {this.refs.myModal.open();}

    render() {
        return(
            <Modal ref={'myModal'} style={{ 
                justifyContent: 'center',
                borderRadius: Platform.OS == 'ios' ? 30: 0,
                shadowRadius: 10,
                width: screenWidth - 80,
                height: 280
            }}
            position='center'
            onClosed = {() => {
                Alert.alert("when modal closed");
            }}
            >

            <Text style={{
                fontSize: 16,
                textAlign:'center',
                marginTop: 0
            }}>New foods information</Text>
            <TextInput onChangeText={(text) => this.setState({newFoodName:text})} value={this.state.newFoodName} underlineColorAndroid='transparent' placeholder="Enter foods name" style={{ height:40, borderBottomColor:'gray', marginLeft: 30, marginRight:30, marginTop:20, marginBottom:10, borderBottomWidth:1 }}>
            </TextInput>

            <TextInput onChangeText={(text) => this.setState({newFoodDescription:text})} value={this.state.newFoodDescription} underlineColorAndroid='transparent' placeholder="Enter foods description" style={{ height:40, borderBottomColor:'gray', marginLeft: 30, marginRight:30, marginTop:20, marginBottom:10, borderBottomWidth:1 }}>
            </TextInput>

            <Button
                onPress = {() => {
                    if(this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0) {
                        Alert.alert("Please fill in the details");
                        return;
                    }
                    const newKey = "9832";
                    const newFood = {
                        key: newKey,
                        name: this.state.newFoodName,
                        foodDescription: this.state.newFoodDescription
                    };
                    flatListData.push(newFood);
                    this.props.parentFlatList.refreshFlatList(newKey);
                    this.refs.myModal.close();
                }}
                style={{ fontSize:18, color:'white' }}
                containerStyle={{ padding:8, marginLeft:70, marginRight:70, height:40, backgroundColor:'mediumseagreen' }}
            >
                Save
            </Button>

            </Modal>
        );
    }
}

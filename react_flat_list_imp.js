import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import flatListData from './data/flatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './components/AddModal.js';
import EditModal from './components/EditModal.js';

class FlatListItem extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0
        };          
    }

    refreshFlatListItems = () => {
        this.setState((prevState) => {
            return {
                numberOfRefresh: prevState.numberOfRefresh + 1
            }
        });
    }

    render() {   
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }              
            },          
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key });
            },      
            right: [
                {
                    onPress: () => {
                        this.props.parentFlatList.refs.editModal.showEditModal(
                            flatListData[this.props.index], this);
                    },
                    text: 'Edit', type: 'primary'
                },
                { 
                    onPress: () => {    
                        const deletingRow = this.state.activeRowKey;          
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [                              
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {        
                                flatListData.splice(this.props.index, 1); 
                                //Refresh FlatList ! 
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                              }},
                            ],
                            { cancelable: true }
                          ); 
                    }, 
                    text: 'Delete', type: 'delete' 
                }
            ],  
            rowId: this.props.index, 
            sectionId: 1    
        };               
        return (  
            <Swipeout {...swipeSettings}>
                <View style={{
                flex: 1,
                flexDirection:'column',                                
                }}>            
                    <View style={{
                            flex: 1,
                            flexDirection:'row',
                            // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'                
                            backgroundColor: 'mediumseagreen'
                    }}>            
                        <Image 
                            source={{uri: "https://www.w3schools.com/w3css/img_lights.jpg"}}
                            style={{width: 100, height: 100, margin: 5}}
                        >

                        </Image>
                        <View style={{
                                flex: 1,
                                flexDirection:'column',   
                                height: 100                 
                            }}>            
                                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                                <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
                        </View>              
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor:'white'                            
                    }}>
                
                    </View>
                </View>   
            </Swipeout>      
            
        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,  
    }
});

export default class BasicFlatList extends Component {
    constructor(props) {
        super(props);     
        this.state = ({
            deletedRowKey: null,            
        });
    }
    refreshFlatList = (deletedKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: deletedKey
            };
        });
        this.refs.flatlist.scrollToEnd();
    }

    _onPressAdd = () => {
      // Alert.alert("you add item");
      this.refs.addModal.showAddModal();
    }

    render() {
      return (
        <View style={{flex: 1, marginTop: 24}}>
            <View style={{ backgroundColor:'tomato', height:64, flexDirection: 'row', justifyContent:'flex-end'}}>
              <TouchableHighlight
              style={{ marginRight:10 }} underlayColor='tomato'
              onPress={this._onPressAdd}>
                <Image
                source={{ uri:"https://cdn3.iconfinder.com/data/icons/line/36/add-512.png" }}
                style={{ width:35, height:35, marginTop:11}}>

                </Image>
              </TouchableHighlight>
            </View>
            <FlatList 
                ref={'flatlist'}
                data={flatListData}
                renderItem={({item, index})=>{
                    // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                    //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                    return (
                    <FlatListItem item={item} index={index} parentFlatList={this}>

                    </FlatListItem>);
                }}
                >

            </FlatList>
            <AddModal ref={'addModal'} parentFlatList={this}>

            </AddModal>

            <EditModal ref={'editModal'} parentFlatList={this}>

            </EditModal>

        </View>
      );
    }
}
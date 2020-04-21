import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


export default class NFCModal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log('hideprop:' + this.props.hide);
        if(this.props.hide){
            return null;
        }
        return(
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Icon name="md-wifi" size={20} color="red" solid />
                <Text style={{color: 'white'}}>NFC nicht eingeschaltet</Text>
                <Text style={{color: 'white', marginTop: 30}} onPress={this.props.onPress()} >Open Android Settings</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        position: 'absolute',
      },
      modalView: {
        margin: 20,
        backgroundColor:'rgba(52, 52, 52, 0.8)',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }
});

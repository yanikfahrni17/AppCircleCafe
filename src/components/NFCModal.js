import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                <Icon style={{marginBottom: 10}} name="ios-alert" size={50} color="#fcba03" solid />
                <Text style={{color: 'white', fontSize: 18, marginBottom: 20}}>NFC nicht eingeschaltet</Text>
                <Text style={{color: 'white', fontSize: 14, marginBottom: 30, textAlign: 'center'}}>NFC ist auf deinem Smartphone deaktiviert. Aktiviere NFC in den Einstellungen, um den Drinkpass zu benützen.</Text>
                <TouchableOpacity style={styles.openSettingsButton} onPress={this.props.onPress()}>
                    <Icon style={{marginRight: 10}} name="md-switch" size={25} color="#fff" solid />
                    <Text style={{color: 'white', fontSize: 16}} >NFC Einstellungen öffnen</Text>
                </TouchableOpacity>
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
      },
      openSettingsButton:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginLeft: 5,
        marginRight: 5, 
        padding: 10,

        flexDirection: 'row'
      }
});

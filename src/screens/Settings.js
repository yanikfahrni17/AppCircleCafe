import React, { Component} from 'react';
import { ActivityIndicator, Text, View, Switch } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import Card from '../components/Card';

class Settings extends Component {

    state = { isLoading: true, infoPermissionEvents: false, infoPermissionBeerpong: false, infoPermissionSport: false };
    
    async componentDidMount(){
        this._retrievePermissions().then(() => {this.setState({isLoading: false})});
    }
    async _retrievePermissions() {
        try {
            let permEventsVar = await AsyncStorage.getItem('permEvents');
            let permBeerpongVar = await AsyncStorage.getItem('permBeerpong');
            let permSportVar = await AsyncStorage.getItem('permSport');
          if(permEventsVar !== null){
            this.setState({infoPermissionEvents: true});
          }
          if(permBeerpongVar !== null){
            this.setState({infoPermissionBeerpong: true});
          }
          if(permSportVar !== null){
            this.setState({infoPermissionSport: true});
          }
        } catch (error) {
          console.log('Erlaubnis Anfrage für Push Mitteilungen ging schief');
        }
      };

    async componentDidUpdate() {
        if(this.state.infoPermissionEvents === true){
            messaging()
            .subscribeToTopic('events')
            .then(() => console.log('Subscribed to events!'));
            await AsyncStorage.setItem('permEvents', 'true');
        } else {
            messaging()
            .unsubscribeFromTopic('events')
            .then(() => console.log('Unsubscribed from events!'));
            await AsyncStorage.removeItem('permEvents');
        }
        if(this.state.infoPermissionBeerpong === true){
            messaging()
            .subscribeToTopic('beerpong')
            .then(() => console.log('Subscribed to beerpong!'));
            await AsyncStorage.setItem('permBeerpong', 'true');
        } else {
            messaging()
            .unsubscribeFromTopic('beerpong')
            .then(() => console.log('Unsubscribed from beerpong!'));
            await AsyncStorage.removeItem('permBeerpong');
        }
        if(this.state.infoPermissionSport === true){
            messaging()
            .subscribeToTopic('sport')
            .then(() => console.log('Subscribed to sport!'));
            await AsyncStorage.setItem('permSport', 'true');
        } else {
            messaging()
            .unsubscribeFromTopic('sport')
            .then(() => console.log('Unsubscribed from sport!'));
            await AsyncStorage.removeItem('permSport');
        }
      }

    setPermissionEvents = (value) => {
        this.setState({infoPermissionEvents: value});
      };
    setPermissionBeerpong = (value) => {
    this.setState({infoPermissionBeerpong: value});
    };
    setPermissionSport = (value) => {
        this.setState({infoPermissionSport: value});
        };
    render(){
        if(this.state.isLoading){
            return(
              <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                <ActivityIndicator size="large" color="#333" style={{marginTop: 150}} />
              </View>
            )
          }
        return(
            <View>
                <Text style={styles.headerTextStyle}>Push Mitteilungen</Text>
                <Card>
                    <View style={styles.containerStyle}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 20}}>Bevorstehende Events</Text>
                            <Switch
                            trackColor={{ false: "#aaa", true: "#fcba03" }}
                            thumbColor={"#333"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange = {this.setPermissionEvents}
                            value = {this.state.infoPermissionEvents}/>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text>Infos zu Konzerten, Dorfveranstaltungen und Partys </Text>
                        </View>
                    </View>
                </Card>
                <Card>
                    <View style={styles.containerStyle}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 20}}>Beerpongturniere</Text>
                            <Switch
                            trackColor={{ false: "#aaa", true: "#fcba03" }}
                            thumbColor={"#333"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange = {this.setPermissionBeerpong}
                            value = {this.state.infoPermissionBeerpong}/>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text>Infos zu bevorstehenden Beerpong Turnieren</Text>
                        </View>
                    </View>
                </Card>
                <Card>
                    <View style={styles.containerStyle}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 20}}>Live Sportübertragungen</Text>
                            <Switch
                            trackColor={{ false: "#aaa", true: "#fcba03" }}
                            thumbColor={"#333"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange = {this.setPermissionSport}
                            value = {this.state.infoPermissionSport}/>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text>Infos zu bevorstehenden Live-Sportübertragungen</Text>
                        </View>
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = {
    headerTextStyle:{
        fontSize: 20,
        marginTop: 20,
        marginLeft: 10,
        color: '#333'
    },
    containerStyle:{
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 0,
        backgroundColor: '#fff',
        justifyContet: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        borderColor: '#ddd',
        position: 'relative'
    }
  }

export default Settings;
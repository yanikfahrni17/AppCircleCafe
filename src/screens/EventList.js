import React, { Component } from 'react';
import { ActivityIndicator, Text, View, ScrollView, Switch, StatusBar, StyleSheet } from 'react-native';
import axios from 'axios';
import EventDetail from './EventDetail';
import IconSettings from '../components/IconSettings';

let textEvents = 'Bevorstehende Events';

class EventList extends Component {

    state = { events: [], infoSwitch: false, isLoading: true, noData: true};
    
    componentDidMount(){
        axios.get('https://circlecafe.ch/UpcomingEvents').then(response => 
        {
          if(!response.data.length){
            this.setState({noData: true});
          }else{
            this.setState({noData: false});
            console.log('componentDidMount axios durchlaufen und auf false gesetzt')
            this.setState({ events: response.data });
          }
        }).then(() => {this.setState({isLoading: false})}); 
      }

    renderUpcomingEvents() {
      if(this.state.isLoading){
        return(
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
            <ActivityIndicator size="large" color="#333" style={{marginTop: 150}} />
          </View>
        )
      };
      console.log('vor if abfrage:' + this.state.noData);
      if(this.state.noData === false){
        return this.state.events.map(event => 
          <EventDetail key={event.FID} event={event} />
      )
      }else{
        console.log('else:' + this.state.events.length);
        return <Text style={{marginLeft: 20}}>Momentan sind keine bevorstehenden Events geplant.</Text>
      }
    }

    toggleSwitch = async (value) => {
      this.setState({infoSwitch: value});
      this.setState({isLoading: true});
      if (this.state.infoSwitch === true) {
        textEvents = 'Bevorstehende Events';
        await axios.get('https://circlecafe.ch/UpcomingEvents').then(response => 
        {             
          if(!response.data.length){
            this.setState({noData: true});
          }else{
            this.setState({noData: false});
            this.setState({events: response.data});
          }
        }).then(() => {this.setState({isLoading: false})});
      } else {
        textEvents = 'Alle Events';
        await axios.get('https://circlecafe.ch/EventList').then(response => 
        {
          if(!response.data.length){
            this.setState({noData: true});
          }else{
            this.setState({noData: false});
            this.setState({events: response.data});
          }
        }).then(() => {this.setState({isLoading: false})});
      }
    };

    
  render() {
      return (
    <View>
      <StatusBar backgroundColor="#333" />
      <View style={{backgroundColor: 'white', height: 60, justifyContent: 'space-between',flexDirection: 'row', alignItems: 'center' }}>
        <IconSettings />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{textAlign: 'left', marginRight: 10}}>Vergangene Events anzeigen</Text>
          <Switch
          trackColor={{ false: "#aaa", true: "#fcba03" }}
          thumbColor={"#333"}
          ios_backgroundColor="#3e3e3e"
          onValueChange = {this.toggleSwitch}
          value = {this.state.infoSwitch}/>
        </View>
      </View>  
      <ScrollView>
      <Text style={{fontSize: 24, color: '#333', marginLeft: 20, marginTop: 10}}>{textEvents}</Text>
        {this.renderUpcomingEvents()}
      </ScrollView>
    </View>
    );
  };
};


export default EventList;

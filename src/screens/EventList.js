import React, { Component, useState } from 'react';
import { Text, View, ScrollView, TextInput, Button, TouchableHighlight, Switch } from 'react-native';
import axios from 'axios';

import EventDetail from './EventDetail';



class EventList extends Component {

    state = { events: [], infoSwitch: false };
    
    componentDidMount(){
        axios.get('https://circlecafe.ch/UpcomingEvents').then(response => this.setState({ events: response.data })); 

      }

    renderUpcomingEvents() {
      if(this.state.events.length > 1){
        console.log('no events');
      }else{
        return this.state.events.map(event => 
            <EventDetail key={event.FID} event={event} />
        );
      }
    }
    renderPastEvents(){
        axios.get('https://circlecafe.ch/PastEvents').then(response => this.setState({events: [...this.state.events, ...response.data]}));
    }

    onAddRequirementComponent() {
      axios.get('https://circlecafe.ch/PastEvents').then(function (response){
        
        this.setState({currentEvents: response.data});
        this.setState(previousState => ({
          oldevents: [...previousState.oldevents, previousState.currentEvents],
          currentEvents:''
        }))
        console.log(this.state.oldevents);
      });

    }
    toggleSwitch = (value) => {
      this.setState({infoSwitch: value});
      if (this.state.infoSwitch === true) {
        axios.get('https://circlecafe.ch/UpcomingEvents').then(response => this.setState({events: response.data}));
      } else {
        axios.get('https://circlecafe.ch/EventList').then(response => this.setState({events: response.data}));
      }
    };
    
  render() {
      return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Switch
         onValueChange = {this.toggleSwitch}
         value = {this.state.infoSwitch}/>
      <ScrollView>{this.renderUpcomingEvents()}

      <TouchableHighlight onPress={() => {this.renderPastEvents()}} 
        style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#007aff',
            marginLeft: 5,
            marginRight: 5,
            marginTop: 20,
            paddingTop: 10,
            paddingBottom: 10
        }}>
          <Text>Vergangene Events anzeigen</Text>
      </TouchableHighlight>

      </ScrollView>
    </View>
    );
  };
};

export default EventList;

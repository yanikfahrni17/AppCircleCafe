import React, { Component } from 'react';
import { Text, View, ScrollView, Switch, StatusBar } from 'react-native';
import axios from 'axios';
import EventDetail from './EventDetail';
let textEvents = 'Bevorstehende Events';

class EventList extends Component {

    state = { events: [], infoSwitch: false };
    
    
    componentDidMount(){
        axios.get('https://circlecafe.ch/UpcomingEvents').then(response => this.setState({ events: response.data })); 
      }

    renderUpcomingEvents() {
        return this.state.events.map(event => 
            <EventDetail key={event.FID} event={event} />
        );
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
        textEvents = 'Bevorstehende Events';
      } else {
        axios.get('https://circlecafe.ch/EventList').then(response => this.setState({events: response.data}));
        textEvents = 'Alle Events';
      }
    };

    
  render() {
      return (
    <View>
      <StatusBar backgroundColor="#333" />
      <View style={{backgroundColor: 'white', padding: 20, height: 60, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={{textAlign: 'left', marginRight: 20}}>Vergangene Events einblenden</Text>
        <Switch
         onValueChange = {this.toggleSwitch}
         value = {this.state.infoSwitch}/>
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

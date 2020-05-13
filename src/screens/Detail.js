import React from 'react';
import {View,Image, Text, Linking, TouchableOpacity} from 'react-native';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/de-ch';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import Icon from "react-native-vector-icons/Ionicons";

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import CardSectionLink from '../components/CardSectionLink';
import CardSectionImage from '../components/CardSectionImage';

const utcDateToString = (momentInUTC: moment): string => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    // console.warn(s);
    return s;
  };

const Detail = ({route}) => {
    const {eventdetail}  = route.params;
    return(
    <View>
        <Card>   
            <CardSectionImage>
                <Image 
                    style={styles.imageStyle}
                    source={{uri: eventdetail.fb_image}}
                />
            </CardSectionImage>
            <CardSection>
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>{eventdetail.fb_description}</Text> 
            </CardSection>
            <CardSection>
                    <Icon style={{marginRight: 10, marginTop: 5}} name="md-time" size={25} color="#333" solid />
                    <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>
                        <Moment element={Text} format="LL" locale="de-ch">{eventdetail.fb_start_time}</Moment> ab <Moment element={Text} format="LT" locale="de-ch">{eventdetail.fb_start_time}</Moment>
                    </Text>
            </CardSection>
            <TouchableOpacity onPress={() => Linking.openURL('https://goo.gl/maps/uRhhoBz7LJLicmQq7')}>
            <View style={styles.containerStyle}>
            <View style={{flexDirection: 'row', alignItem: 'center'}}>
              <Icon style={{marginRight: 10, alignSelf: 'center'}} name="md-pin" size={25} color="#333" solid />
              <Text style={{fontSize: 16, color: '#333', alignSelf: 'center'}}>Dorfstrasse 1A, 3506 Grosshöchstetten</Text>
            </View>
            <Icon style={{alignSelf: 'center', marginRight: 20}} name="ios-arrow-forward" size={30} color="#ccc" solid />
          </View>
            </TouchableOpacity>
        </Card>

        <TouchableOpacity style={styles.addToCalendarButton} onPress={() => {addToCalendar(eventdetail.fb_eventname, eventdetail.fb_start_time, eventdetail.fb_end_time, eventdetail.fb_description)}}>
            <Text style={styles.addToCalendarText}><Icon name="ios-calendar" size={20} color="#333" solid />  Zum Kalender hinzufügen</Text>
        </TouchableOpacity>
    </View>   
    
    )
}


function addToCalendar(title, startDate, endDate, description){
    const eventConfig = {
      title,
      startDate: utcDateToString(startDate),
      endDate: utcDateToString(endDate),
      location: 'Circle Cafe Underground, Dorfstrasse 1A, 3506 Grosshöchstetten',
      notes: JSON.stringify(description)
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
        // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
        // These are two different identifiers on iOS.
        // On Android, where they are both equal and represent the event id, also strings.
        // when { action: 'CANCELED' } is returned, the dialog was dismissed
        //console.warn(JSON.stringify(eventInfo));
      })
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };

const styles = {
    imageStyle:{
        height: 200,
        flex: 1,
        width: null
    },
    addToCalendarText:{
        alignSelf: 'center',
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 12,
        paddingBottom: 12
    },
    addToCalendarButton: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shodowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    containerStyle:{
        borderBottomWidth: 1,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 10,
        paddingRight: 0,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: '#ddd',
        position: 'relative'
    }
  };
export default Detail;
import React from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/de-ch';
import Icon from "react-native-vector-icons/Ionicons";

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import CardSectionImage from '../components/CardSectionImage';


const EventDetail = ({event}) => {
  const {FID, fb_eventname, fb_description, fb_start_time, fb_end_time, fb_location, fb_image} = event;
  const {thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle, containerStyle} = styles;
  const navigation = useNavigation();
 
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Detail', {eventdetail: event, name: fb_eventname})}>
      <Card>   
        <CardSectionImage>
            <Image 
                style={imageStyle}
                source={{uri: fb_image}}
            />
        </CardSectionImage>
        <View style={containerStyle}>
            <View styles={headerContentStyle}>
                <Text style={headerTextStyle}>{fb_eventname}</Text>
                <Text>
                    <Moment element={Text} format="LL" locale="de-ch">{fb_start_time}</Moment> ab <Moment element={Text} format="LT" locale="de-ch">{fb_start_time}</Moment>
                </Text>
            </View>
            <Icon style={{alignSelf: 'center', marginRight: 20}} name="ios-arrow-forward" size={30} color="#ccc" solid />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = {
  headerContentStyle:{
      flexDirection: 'column',
      justifyContent: 'space-around'
  },
  headerTextStyle:{
      fontSize: 18,
      color: '#333',
  },
  thumbnailStyle :{
      height: 100,
      width: 100
  },
  imageStyle:{
      height: 200,
      flex: 1,
      width: null
  },
  containerStyle:{
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
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

export default EventDetail;

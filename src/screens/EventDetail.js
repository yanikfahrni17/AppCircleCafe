import React from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/de-ch';

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import CardSectionImage from '../components/CardSectionImage';


const EventDetail = ({ event}) => {
  const {FID, fb_eventname, fb_description, fb_start_time, fb_end_time, fb_location, fb_image} = event;
  const {thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle} = styles;
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
        <CardSection>
            <View styles={headerContentStyle}>
                <Text style={headerTextStyle}>{fb_eventname}</Text>
                <Text>
                    <Moment element={Text} format="LL" locale="de-ch">{fb_start_time}</Moment> ab <Moment element={Text} format="LT" locale="de-ch">{fb_start_time}</Moment>
                </Text>
            </View>
        </CardSection>
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
  }
};

export default EventDetail;

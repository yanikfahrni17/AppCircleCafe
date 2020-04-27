import React from 'react';
import { Text, View, Image, Linking, TouchableHighlight} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Detail from './Detail';


const EventDetail = ({event}) => {
  const {FID, fb_eventname, fb_description, fb_start_time, fb_end_time, fb_location, fb_image} = event;
  const {thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle} = styles;
  return (
 
      <Card>   
            <CardSection>
                <View styles={headerContentStyle}>
                    <Text style={headerTextStyle}>{fb_eventname}</Text>
                </View>
            </CardSection>
            <CardSection>
                <Image 
                    style={imageStyle}
                    source={{uri: fb_image}}
                />
            </CardSection>

          <CardSection>
              {/*
              <Button onPress={() => Linking.openURL('https://circlecafe.ch')}>
                  Details
              </Button>
              */}
                <Button onPress={() => navigation.navigate('EventDetail', {screen: 'Detail'})}>
                  Mehr
              </Button>
          </CardSection>
      </Card>
  );
};

const styles = {
  headerContentStyle:{
      flexDirection: 'column',
      justifyContent: 'space-around'
  },
  headerTextStyle:{
      fontSize: 18
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

const Stack = createStackNavigator();
function EventDetailScreen(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="EventDetail" component={EventDetail} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>  
    )
}

export default EventDetail;

import React from 'react';
import { Text, View, Image, Linking, TouchableHighlight} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';

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
              <Button onPress={() => Linking.openURL('https://circlecafe.ch')}>
                  Details
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

export default EventDetail;

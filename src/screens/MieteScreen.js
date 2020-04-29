import React, {Component} from 'react';
import { View, Text, ScrollView, Linking, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { SliderBox } from "react-native-image-slider-box";

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import CardSectionImage from '../components/CardSectionImage';

class MieteScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagesAllgemein: [
        require('../images/circlecafe_mieten10.jpg'),
        require('../images/circlecafe_mieten6.jpg'),
        require('../images/circlecafe_mieten7.jpg'),
        require('../images/circlecafe_mieten2.jpg')
      ],
      imagesAusstattung: [
        require('../images/circlecafe_mieten1.jpg'),
        require('../images/circlecafe_mieten9.jpg'),
        require('../images/circlecafe_mieten4.jpg')
      ],
      imagesMultimedia: [
        require('../images/circlecafe_mieten3.jpg'),
        require('../images/circlecafe_mieten8.jpg'),
        require('../images/circlecafe_mieten5.jpg')
      ]
    };
  }

  onLayout = e => {
    this.setState({
      width: 600
    });
  };

  render() {
  return (
    <ScrollView>
      <Text style={styles.headerTextStyle}>Eigene Party geplant?</Text>
      <Card>
        <CardSectionImage>
            <Image 
                style={styles.imageStyle}
                source={require('../images/circlecafe_mieten10.jpg')}
            />
        </CardSectionImage>
        <CardSection>
          <Text style={{fontSize: 14, color: '#333'}}>Ob Geburtstag, Teamanlass oder Klassenzusammenkunft der Gewölbekeller kann für jeden Anlass gemietet werden. </Text>
        </CardSection>
      </Card>
      <Text style={styles.headerTextStyle}>Ausstattung</Text>
      <Card>
      <CardSectionImage>
            <SliderBox images={this.state.imagesAusstattung} style={styles.imageSliderStyle} sliderBoxHeight={250} circleLoop />
        </CardSectionImage>
        <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="ios-flame" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}> Fumoire</Text> 
          </CardSection>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="ios-easel" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>3 grosse HD Screens</Text> 
          </CardSection>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="md-beer" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>Bar mit Bierzapfhahn</Text> 
          </CardSection>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="md-pizza" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>Backofen mit 4 Herdplatten</Text> 
          </CardSection>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="md-today" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>Industriegeschirrspüler</Text> 
          </CardSection>
      </Card>
      <Text style={styles.headerTextStyle}>Multimedia</Text>
      <Card>
      <CardSectionImage>
            <SliderBox images={this.state.imagesMultimedia} style={styles.imageSliderStyle} sliderBoxHeight={250} circleLoop />
        </CardSectionImage>
        <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="ios-wifi" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>WLAN im ganzen Lokal</Text> 
        </CardSection>
        <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="ios-musical-notes" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>Mixpult für Beschallungsanlage</Text> 
        </CardSection>
        <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="md-volume-high" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>Beschallungsanlage mit Möglichkeit für Konzerte</Text> 
        </CardSection>
      </Card>
      <Text style={styles.headerTextStyle}>Getränke und Verpflegung</Text>
      <Card>
      <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="ios-wine" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>Getränke können über Bar bezogen werden</Text> 
        </CardSection>
        <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="md-pizza" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>Cateringpartner bietet viele Angebote</Text> 
        </CardSection>
      </Card>
      <Text style={styles.headerTextStyle}>Kontaktmöglichkeiten</Text>
      <Card>
      <TouchableOpacity onPress={() => Linking.openURL('https://goo.gl/maps/uRhhoBz7LJLicmQq7')}>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="md-pin" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}> Dorfstrasse 1A, 3506 Grosshöchstetten</Text> 
          </CardSection>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:info@circlecafe.ch')}>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="ios-mail" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}> info@circlecafe.ch</Text> 
          </CardSection>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('tel:0795499884')}>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="ios-call" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}> 079 549 98 84</Text> 
          </CardSection>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://circlecafe.ch')}>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="md-globe" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>www.circlecafe.ch</Text> 
          </CardSection>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://circlecafe.ch/miete')}>
          <CardSection>
            <Icon style={{marginRight: 10, marginTop: 5}} name="md-calendar" size={25} color="#333" solid />
            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5,  color: '#333'}}>Reservation erfassen</Text> 
          </CardSection>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
  };
}
const styles = {
  headerContentStyle:{
      flexDirection: 'column',
      justifyContent: 'space-around'
  },
  headerTextStyle:{
      fontSize: 20,
      marginTop: 20,
      marginLeft: 10,
      color: '#333'
  },
  thumbnailStyle :{
      height: 100,
      width: 100
  },
  imageStyle:{
      height: 250,
      width: '100%'
  },
  imageSliderStyle:{
    height: 250,
    width: null,
    marginRight: 12
}
};
export default MieteScreen;

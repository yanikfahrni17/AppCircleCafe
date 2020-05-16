import React, {Component} from 'react';
import { View, Text, ScrollView, Linking, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { SliderBox } from "react-native-image-slider-box";

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import CardSectionLink from '../components/CardSectionLink';
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
          <Text style={{fontSize: 16, color: '#333', textAlign: 'center'}}>Ob Geburtstag, Teamanlass oder Klassenzusammenkunft der Gewölbekeller kann für jeden Anlass gemietet werden. </Text>
        </CardSection>
      </Card>
      <Text style={styles.headerTextStyle}>Ausstattung</Text>
      <Card>
      <CardSectionImage>
            <SliderBox images={this.state.imagesAusstattung} style={styles.imageSliderStyle} sliderBoxHeight={250} circleLoop />
        </CardSectionImage>
        <CardSection>
            <Icon style={styles.iconStyle} name="ios-flame" size={25} color="#333" solid />
            <Text style={styles.textStyle}> Fumoire</Text> 
          </CardSection>
          <CardSection>
            <Icon style={styles.iconStyle} name="ios-easel" size={25} color="#333" solid />
            <Text style={styles.textStyle}>3 grosse HD Screens</Text> 
          </CardSection>
          <CardSection>
            <Icon style={styles.iconStyle} name="md-beer" size={25} color="#333" solid />
            <Text style={styles.textStyle}>Bar mit Bierzapfhahn</Text> 
          </CardSection>
          <CardSection>
            <Icon style={styles.iconStyle} name="md-pizza" size={25} color="#333" solid />
            <Text style={styles.textStyle}>Backofen mit 4 Herdplatten</Text> 
          </CardSection>
          <CardSection>
            <Icon style={styles.iconStyle} name="md-today" size={25} color="#333" solid />
            <Text style={styles.textStyle}>Industriegeschirrspüler</Text> 
          </CardSection>
      </Card>
      <Text style={styles.headerTextStyle}>Multimedia</Text>
      <Card>
      <CardSectionImage>
            <SliderBox images={this.state.imagesMultimedia} style={styles.imageSliderStyle} sliderBoxHeight={250} circleLoop />
        </CardSectionImage>
        <CardSection>
            <Icon style={styles.iconStyle} name="ios-wifi" size={25} color="#333" solid />
            <Text style={styles.textStyle}>WLAN im ganzen Lokal</Text> 
        </CardSection>
        <CardSection>
            <Icon style={styles.iconStyle} name="ios-musical-notes" size={25} color="#333" solid />
            <Text style={styles.textStyle}>Mixpult Behringer DDM4000</Text> 
        </CardSection>
        <CardSection>
            <Icon style={styles.iconStyle} name="md-volume-high" size={25} color="#333" solid />
            <Text style={styles.textStyle}>Hochwertige Soundanlage im ganzen Lokal</Text> 
        </CardSection>
      </Card>
      <Text style={styles.headerTextStyle}>Getränke und Verpflegung</Text>
      <Card>
      <CardSection>
            <Icon style={styles.iconStyle} name="ios-wine" size={25} color="#333" solid />
            <Text style={styles.textStyle}>Diverse Getränke stehen zur Verfügung</Text> 
        </CardSection>
        <CardSection>
            <Icon style={styles.iconStyle} name="md-pizza" size={25} color="#333" solid />
            <Text style={styles.textStyle}>Cateringpartner mit vielen Angeboten</Text> 
        </CardSection>
      </Card>
      <Text style={styles.headerTextStyle}>Kontaktmöglichkeiten</Text>
      <Card>
      <TouchableOpacity onPress={() => Linking.openURL('https://goo.gl/maps/uRhhoBz7LJLicmQq7')}>
          <CardSectionLink>
            <View style={{flexDirection: 'row', alignItem: 'center'}}>
              <Icon style={{marginRight: 15, alignSelf: 'center'}} name="md-pin" size={25} color="#333" solid />
              <View>
                <Text style={{fontSize: 16, color: '#333'}}>Dorfstrasse 1A</Text>
                <Text style={{fontSize: 16, color: '#333'}}>3506 Grosshöchstetten</Text>
              </View>
            </View>
            <Icon style={{alignSelf: 'center', marginRight: 20}} name="ios-arrow-forward" size={30} color="#ccc" solid />
          </CardSectionLink>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:info@circlecafe.ch')}>
        <CardSectionLink>
            <View style={{flexDirection: 'row', alignItem: 'center'}}>
              <Icon style={{marginRight: 10, alignSelf: 'center'}} name="ios-mail" size={25} color="#333" solid />
              <Text style={{fontSize: 16, color: '#333', alignSelf: 'center'}}>info@circlecafe.ch</Text>
            </View>
            <Icon style={{alignSelf: 'center', marginRight: 20}} name="ios-arrow-forward" size={30} color="#ccc" solid />
          </CardSectionLink>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('tel:0795499884')}>
        <CardSectionLink>
            <View style={{flexDirection: 'row', alignItem: 'center'}}>
              <Icon style={{marginRight: 10, alignSelf: 'center'}} name="ios-call" size={25} color="#333" solid />
              <Text style={{fontSize: 16, color: '#333', alignSelf: 'center'}}>079 549 98 84</Text>
            </View>
            <Icon style={{alignSelf: 'center', marginRight: 20}} name="ios-arrow-forward" size={30} color="#ccc" solid />
          </CardSectionLink>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://circlecafe.ch')}>
        <CardSectionLink>
            <View style={{flexDirection: 'row', alignItem: 'center'}}>
              <Icon style={{marginRight: 10, alignSelf: 'center'}} name="md-globe" size={25} color="#333" solid />
              <Text style={{fontSize: 16, color: '#333', alignSelf: 'center'}}>www.circlecafe.ch</Text>
            </View>
            <Icon style={{alignSelf: 'center', marginRight: 20}} name="ios-arrow-forward" size={30} color="#ccc" solid />
          </CardSectionLink>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://circlecafe.ch/miete')}>
          <CardSectionLink>
            <View style={{flexDirection: 'row', alignItem: 'center'}}>
              <Icon style={{marginRight: 10, alignSelf: 'center'}} name="md-calendar" size={25} color="#333" solid />
              <Text style={{fontSize: 16, color: '#333', alignSelf: 'center'}}>Reservation erfassen</Text>
            </View>
            <Icon style={{alignSelf: 'center', marginRight: 20}} name="ios-arrow-forward" size={30} color="#ccc" solid />
          </CardSectionLink>
        </TouchableOpacity>
      </Card>
      <View style={{marginTop: 10}}></View>
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
  }, 
  iconStyle:{
    left: 12, 
    alignSelf: 'center', 
    position: 'absolute'
  },
  textStyle:{
    fontSize: 16, 
    marginBottom: 10, 
    marginTop: 5, 
    marginLeft: 35,  
    color: '#333'
  }
};
export default MieteScreen;

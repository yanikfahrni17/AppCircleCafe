import React from 'react';
import { Text, View, Linking, Image } from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';

const MieteScreen = () => {
  return (
  <Card>
      {/*
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
        
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
       */}

        <CardSection>
                <View style={styles.headerContentStyle}>
                    <Text style={styles.headerTextStyle}>Eigene Party geplant?</Text>
                </View>
            </CardSection>
            <CardSection>
                <Image 
                    style={styles.imageStyle}
                    source={{uri:'https://www.circlecafe.ch/images/BarVorne4.jpg'}}
                />
            </CardSection>
       <CardSection>
        <Button onPress={() => Linking.openURL('https://circlecafe.ch/miete')}>Circle Cafe mieten</Button>
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

export default MieteScreen;

import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import NfcManager, {NfcEvents, Ndef} from 'react-native-nfc-manager';
//import Icon from 'react-native-vector-icons/Ionicons';

const DATA = [
  {
    id: 1,
    title: 'first beer'
  },
  {
    id: 2,
    title: 'second beer'
  },
  {
    id: 3,
    title: 'third beer'
  },
  {
    id: 4,
    title: 'fourth beer'
  },
  {
    id: 5,
    title: 'fifth beer'
  },
  {
    id: 6,
    title: 'sixth beer'
  },
  {
    id: 7,
    title: 'seventh beer'
  },
  {
    id: 8,
    title: 'eigth beer'
  },
  {
    id: 9,
    title: 'ninth beer'
  },
  {
    id: 10,
    title: 'tenth beer'
  }
];

function Item(){
    return(
      <View style={styles.item}>
        <Icon name="md-beer" size={50} color="#fcba03" solid />
      </View>
    )
  }
  function Item2(){
    return(
      <View style={styles.item2}>
        <Icon name="md-beer" size={50} color="#999" solid />
      </View>
    )
  }
class BeerPass extends React.Component {

  state = {count: 0, voucher: 3};

  renderList(){
    return(
      <FlatList
      data={DATA}
      horizontal={false}
      numColumns={5}
      renderItem={({item}) => {
        if(item.id <= this.state.count){
          return <Item title={item.title} />;
        }else{
          return <Item2 title={item.title} />;
        }
      }}
      keyExtractor={item => item.id}
      /> 
    )
  }

  renderVouchers(){
    const output = [];
    console.log('hello');
      for(var y = 0; y < this.state.voucher; y++){
      console.log(y);
      let tempItem = (
        <View key={y} style={{padding: 10, borderWidth: 1, borderColor: 'black', marginTop: 10}}>
        <View>
          <Text style={{fontSize: 20, height: 30}}>Gutschein für ein Bier</Text>
          <Text style={{fontSize: 12, height: 30}}>Achtung! Der Gutschein wird durch das Klicken auf den Button 'einlösen' verschwinden</Text>
        </View>
        <TouchableOpacity onPress={this._hideVoucher} style={{width: 100, backgroundColor: '#fcba03', padding: 20}}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>Einlösen</Text>
        </TouchableOpacity>
      </View>
      )
      output[y] = (tempItem);
    }
    return output;
  }

  getVoucher(){
    this.setState({voucher: this.state.voucher + 1});
    this.setState({count: 0})
  }

  componentDidMount() {
    NfcManager.start();
    //NfcManager.registerTagEvent();

    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      //console.warn('tag', tag);
      NfcManager.setAlertMessageIOS('I got your tag!');
      //NfcManager.unregisterTagEvent().catch(() => 0);

      if (tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecords = tag.ndefMessage;
        function decodeNdefRecord(record) {
          if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return ['text', Ndef.text.decodePayload(record.payload)];
          }else{
            return 'falscher Tag ;)';
          }
      }
      let parsed = ndefRecords.map(decodeNdefRecord);
      //console.log(parsed);
      let myArray = parsed.map(function(text){
        return text[1];
      })
      //console.log('array:' + myArray);
      if (myArray == 'beer'){
        console.log('hurra');
        this.setState({count: this.state.count + 1});
        //console.log(this.state.count);
        if(this.state.count == 10){
          console.log('10 erreicht');
          this.getVoucher();
        }
      }else{
        console.log('schade');
      }
      }
    });

  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    return (
      <ScrollView style={{padding: 20}}>
        <Text>Digitaler Bierpass</Text>
        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._test}
        >
          <Text>Beer scannen</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._cancel}
        >
          <Text>Scan abbrechen</Text>
        </TouchableOpacity>

       
          
        <Text>Counter: {this.state.count}</Text>
        <Text>Vouchers: {this.state.voucher}</Text>

        <Text style={{fontSize: 20, marginTop: 20, marginBottom: 20}}>Deine Gutscheine</Text>

        

      </ScrollView>
    )
  }

_hideVoucher = () => {
  this.setState({voucher: this.state.voucher - 1});
  console.log('weg');
}

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  _test = () => {
    NfcManager.registerTagEvent();
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginRight: 10
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 8
  },
  item2: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 8
  }
})

export default BeerPass;
import React from "react";
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  AsyncStorage,
  NativeModules,
  AppState,
} from "react-native";
//import {AsyncStorage} from "@react-native-community/react-native-storage";
import NfcManager, { NfcEvents, Ndef } from "react-native-nfc-manager";
import Icon from "react-native-vector-icons/Ionicons";
import {numberOfBeers, numberOfDrinks} from '../data/data.js';
import NFCModal from '../components/NFCModal';

function Item() {
  return (
    <View style={styles.item}>
      <Icon name="md-beer" size={50} color="#fcba03" solid />
    </View>
  );
}
function Item2() {
  return (
    <View style={styles.item2}>
      <Icon name="md-beer" size={50} color="#999" solid />
    </View>
  );
}
function Item3() {
  return (
    <View style={styles.item3}>
      <Icon name="md-beer" size={20} color="#fcba03" solid />
    </View>
  );
}

function Drink() {
  return (
    <View style={styles.item}>
      <Icon name="md-wine" size={50} color="#fc4e03" solid />
    </View>
  );
}
function Drink2() {
  return (
    <View style={styles.item2}>
      <Icon name="md-wine" size={50} color="#999" solid />
    </View>
  );
}
function Drink3() {
  return (
    <View style={styles.item3}>
      <Icon name="md-wine" size={25} color="#fc4e03" solid />
    </View>
  );
}

class BeerPass extends React.Component {
  constructor(props){
    super(props);
    this.state = {count: 0, voucher: 0, countDrinks: 0, voucherDrinks: 0, isHidden: true, appState: AppState.currentState};
  }
  renderList() {
    return (
      <FlatList
        data={numberOfBeers}
        horizontal={false}
        numColumns={5}
        renderItem={({ item }) => {
          if (item.id <= this.state.count) {
            return <Item title={item.title} />;
          } else {
            return <Item2 title={item.title} />;
          }
        }}
        keyExtractor={item => item.id}
      />
    );
  }

  renderDrinks() {
    return (
      <FlatList
        data={numberOfDrinks}
        horizontal={false}
        numColumns={5}
        renderItem={({ item }) => {
          if (item.id <= this.state.countDrinks) {
            return <Drink title={item.title} />;
          } else {
            return <Drink2 title={item.title} />;
          }
        }}
        keyExtractor={item => item.id}
      />
    );
  }

  renderVouchers() {
    if(this.state.voucher == 0 && this.state.voucherDrinks == 0){
      console.log('no vouchers');
      return(
        <Text>Du hast momentan keine Gutscheine</Text>
      );
    }else{
    const output = [];
    console.log("hello");
    for (var y = 0; y < this.state.voucher; y++) {
      console.log('beergutscheine:' + y);
      let tempItem = (
        <View
          key={y}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: "#999",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, height: 30 }}>
              Gutschein für ein Bier
            </Text>
            <Text style={{ fontSize: 14, height: 45 }}>
               Der Gutschein wird durch das Klicken auf den Button
              'einlösen' verschwinden und verliert seine Gültigkeit.
            </Text>
            <View>
              <FlatList
              data={numberOfBeers}
              horizontal={false}
              numColumns={10}
              renderItem={({ item }) => <Item3 title={item.title} />}
              keyExtractor={item => item.id}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={this._hideVoucher}
            style={{ backgroundColor: "#fcba03", padding: 20, flex: 1, alignItems: 'center' }}
          >
            <Text style={{ color: "#000", fontWeight: "bold" }}>Einlösen</Text>
          </TouchableOpacity>
        </View>
      );
      console.log('voucher Beer');
      output[y] = tempItem;
    }
    for(var x = 0; x < this.state.voucherDrinks; x++){
      console.log('drinkgutscheine:' + x);
      let tempDrink = (
        <View
          key={y+x}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: "#999",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, height: 30 }}>
              Gutschein für ein Drink
            </Text>
            <Text style={{ fontSize: 14, height: 45 }}>
              Der Gutschein wird durch das Klicken auf den Button
              'einlösen' verschwinden und verliert seine Gültigkeit.
            </Text>
          </View>
          <View>
              <FlatList
              data={numberOfDrinks}
              horizontal={false}
              numColumns={10}
              renderItem={({ item }) => <Drink3 title={item.title} />}
              keyExtractor={item => item.id}
              />
            </View>
          <TouchableOpacity
            onPress={this._hideVoucherDrinks}
            style={{ backgroundColor: "#fc4e03", padding: 20, flex: 1, alignItems: 'center' }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Einlösen</Text>
          </TouchableOpacity>
        </View>
      );
      console.log('voucher drink');
      output[y + x] = tempDrink;
    }
    return output;
  }
  }

  openSettings() {
    NativeModules.OpenSettings.openNetworkSettings(data => {
      console.log('call back data', data);
    });
  }

  async componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    if (Platform.OS === 'android'){
      console.log('android');
      NfcManager.isEnabled()
        .then(enabled => {
            console.log('nfc enabled:' + enabled);
            if(enabled === false){
              this.setState({isHidden: false});
            }else{
              this.setState({isHidden: true});
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    console.log('componentdidMount');
    await this._retrieveData();
    await this._retrieveVoucher();    
    await this._retrieveDataDrinks();
    await this._retrieveVoucherDrinks();

    NfcManager.start();
    NfcManager.registerTagEvent();

    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      NfcManager.setAlertMessageIOS("I got your tag!");
      //NfcManager.unregisterTagEvent().catch(() => 0);

      if (tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecords = tag.ndefMessage;
        function decodeNdefRecord(record) {
          if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
            return ["text", Ndef.text.decodePayload(record.payload)];
          } else {
            return "falscher Tag ;)";
          }
        }
        let parsed = ndefRecords.map(decodeNdefRecord);
        let myArray = parsed.map(function(text) {
          return text[1];
        });
        if (myArray == "beer") {
          console.log("hurra");
          this.setState({ count: this.state.count + 1 });
          //console.log(this.state.count);
          this._storeData(this.state.count);
          if (this.state.count == 10) {
            console.log("10 erreicht");
            this.setState({ voucher: this.state.voucher + 1 });
            this.setState({ count: 0 });
            this._storeData(0);
            this._storeVoucher(this.state.voucher);
          }
        } else if (myArray == "drink"){
            console.log('1 Drink');
            this.setState({ countDrinks: this.state.countDrinks + 1 });
            this._storeDataDrinks(this.state.countDrinks);
            if (this.state.countDrinks == 10){
              console.log('10 Drinks erreicht');
              this.setState({ voucherDrinks: this.state.voucherDrinks + 1 });
              this.setState({ countDrinks: 0 });
              this._storeDataDrinks(0);
              this._storeVoucherDrinks(this.state.voucherDrinks);
            }
        }else {
          alert("falsche Karte");
        }
      }
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    return (
      <View>
      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            margin: 20,
            borderWidth: 1,
            borderColor: "black",
          }}
          onPress={this._test}
        >
          <Text>Beer scannen</Text>
        </TouchableOpacity>
{/*
        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            margin: 20,
            borderWidth: 1,
            borderColor: "black",
          }}
          onPress={this._cancel}
        >
          <Text>Scan abbrechen</Text>
        </TouchableOpacity>*/}
        <Text style={{ fontSize: 20}}>Bier</Text>
        {this.renderList()}
        <Text style={{marginTop: 20, fontSize: 20}}>Longdrinks</Text>
        {this.renderDrinks()}
        {/*}
        <Text>CounterBeer: {this.state.count}</Text>
        <Text>Vouchers: {this.state.voucher}</Text>
        <Text>CounterDrinks: {this.state.countDrinks}</Text>
      <Text>VoucherDrinks: {this.state.voucherDrinks}</Text>*/}
        <Text style={{ fontSize: 28, marginTop: 10, marginBottom: 20 }}>
          Deine Gutscheine
        </Text>

        {this.renderVouchers()}
        <View style={{ height : 50 }} ></View>
      </ScrollView>
        <NFCModal hide={this.state.isHidden} onPress={()=>this.openSettings} />
      </View>
      
    );
  }

  async _storeData(data) {
    try {
      var jsonOfItem = await AsyncStorage.setItem('@CircleBeerCounts', JSON.stringify(data));
      console.log('store:' + JSON.parse(jsonOfItem));
    } catch (error) {
      console.log('store Data fails');
    }
  };

  async _storeDataDrinks(data) {
    try {
      var jsonOfItem = await AsyncStorage.setItem('@CircleDrinksCounts', JSON.stringify(data));
      console.log('storeDrinks:' + JSON.parse(jsonOfItem));
    } catch (error) {
      console.log('store Data fails');
    }
  };

  async _storeVoucher(beer){
    try{
      await AsyncStorage.setItem('@CircleBeerVouchers', JSON.stringify(beer));
      console.log('store Voucher Beer:' + JSON.parse(beer));
    } catch (error) {
      console.log('store Voucher fails');
    }
  }
  async _storeVoucherDrinks(drink){
    try{
      await AsyncStorage.setItem('@CircleDrinksVouchers', JSON.stringify(drink));
      console.log('store Voucher Drinks:' + JSON.parse(drink));
    } catch (error) {
      console.log('store Voucher fails');
    }
  }

  async _retrieveData() {
    try {
      const retrievedBeer = await AsyncStorage.getItem('@CircleBeerCounts');
      if(retrievedBeer !== null){
        const beer = JSON.parse(Number(retrievedBeer));
        this.setState({count: beer});
        console.log('retrieved Anzahl Bier:' + beer);
        return beer;
      }
    } catch (error) {
      console.log('retrieve Data fails');
    }
  };

  async _retrieveDataDrinks() {
    try {
      const retrievedDrink = await AsyncStorage.getItem('@CircleDrinksCounts');
      if(retrievedDrink !== null){
        const drink = JSON.parse(Number(retrievedDrink));
        this.setState({countDrinks: drink});
        console.log('retrieved Anzahl Drinks:' + drink);
        return drink;
      }
    } catch (error) {
      console.log('retrieve Data fails');
    }
  };

  async _retrieveVoucher(){
    try{
      const retrievedVoucherBeer = await AsyncStorage.getItem('@CircleBeerVouchers');
      const currentVouchersBeer = JSON.parse(Number(retrievedVoucherBeer));
      this.setState({voucher: currentVouchersBeer});
      console.log('retrieved Anzahl Voucher Beer:' + currentVouchersBeer);
      return  currentVouchersBeer;
    }catch (error){
      console.log('retrieve Vouchers fails');
    }
  }

  async _retrieveVoucherDrinks(){
    try{
      const retrievedVouchersDrink = await AsyncStorage.getItem('@CircleDrinksVouchers');
      if(retrievedVouchersDrink !== null){
        const currentVouchersDrink = JSON.parse(Number(retrievedVouchersDrink));
        this.setState({voucherDrinks: currentVouchersDrink});
        console.log('retrieved Anzahl Vouchers Drink:' + currentVouchersDrink);
        return  currentVouchersDrink;
      }
    }catch (error){
      console.log('retrieve Vouchers fails');
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      if (Platform.OS === 'android'){
        NfcManager.isEnabled()
          .then(enabled => {
              if(enabled === false){
                this.setState({isHidden: false});
              }else{
                this.setState({isHidden: true});
              }
          })
          .catch(err => {
              console.log(err);
          })
      }
    }
    this.setState({appState: nextAppState});
  };

  _hideVoucher = () => {
    this._storeVoucher(this.state.voucher - 1);
    this.setState({ voucher: this.state.voucher - 1 });
    console.log("weg");
  };

  _hideVoucherDrinks = () => {
    this._storeVoucherDrinks(this.state.voucherDrinks - 1);
    this.setState({ voucherDrinks: this.state.voucherDrinks - 1 });
    console.log("weg");
  };

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  _test = () => {
    NfcManager.registerTagEvent();
    console.log('scan start');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  item2: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  item3: {
    padding: 4,
    marginVertical: 8,
    marginHorizontal: 4,
  }
});

export default BeerPass;
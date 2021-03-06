import {format} from 'date-fns';
import React, {useRef, useContext, useState, useEffect} from 'react';
import {Card, Text, Button} from 'react-native-paper';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {BASE_URL} from '@env';
import axios from 'axios'
import Modal from 'react-native-modal';
import AuthStore from '../store/AuthStore';
import MultiSelect from 'react-native-multiple-select';
import DocumentPicker from 'react-native-document-picker';
import {Icon} from 'react-native-elements';
const height = Dimensions.get('window').height;
const RentalFinalBill = ({navigation, route}) => {
  const {from, to, location, description, type, rate,rental_type} = route && route.params;
  const [token, setToken, userLocation] = useContext(AuthStore);
  const [customize, setCustmize] = useState('');
  const [fare, setFare] = useState(parseFloat(rate));
  const [upload, setUpload] = useState(false);
  const [filename, setFilename] = useState();
  const [file, setFile] = useState();
  const dropref = useRef();
  const docPicker = async () => {
    try {
      let res;
      res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFilename(res[0].name);
      setUpload(true);
      let base64 = await RNFS.readFile(res[0].uri, 'base64');
      setFile(base64);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const custome = [
    {
      id: 'Grocery Trays',
      name: 'Grocery Trays - Rs 150',
    },
    {
      id: 'Milk Tank',
      name: 'Milk Tank - Rs 150',
    },
    {
      id: 'Bed Line Over Rail',
      name: 'Bed Line Over Rail - Rs 150',
    },
    {
      id: 'Canopy',
      name: 'Canopy - Rs 150',
    },
    {
      id: 'Cargo Bike Carrier',
      name: 'Cargo Bike Carrier - Rs 150',
    },
    {
      id: 'Cargo Net',
      name: 'Cargo Net - Rs 150',
    },
    {
      id: 'Hard Lid',
      name: 'Hard Lid - Rs 150',
    },
    {
      id: 'Sports Bar',
      name: 'Sports Bar - Rs 150',
    },
  ];
  const[val,setVal] = useState();
  useEffect(()=>{
    setVal(Math.floor(1000 + Math.random() * 9000));
  },[])
  useEffect(() => {
    let size = customize.length;
    let tot = size * 150;
    setFare(parseFloat(rate) + parseFloat(tot));
  }, [customize]);
  const mapRef = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <>
      {userLocation ? (
        <ScrollView>
          <Modal isVisible={isModalVisible}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Card
                style={{
                  height: '50%',
                  width: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Image source={require('../assets/images/gift.gif')} style={{height:'50%',width:300}}/>
                  <Button>Rental Booking Confirmed</Button>
                  <Button style={{matginTop:10}}>Pickup Key : {String(val)}</Button>
                  <Button>Thank You for Choosing</Button>
                  <Button>Isuzu EasyGo</Button>
                  <Button onPress={()=> {setModalVisible(false); navigation.goBack()}} color="blue">Close</Button>
              </Card>
            </View>
          </Modal>
          <Button mode="contained">Rental Bill</Button>
          <Button
            mode="outlined"
            style={{marginVertical: 20, color: 'black', marginHorizontal: 10}}>
            {description}
          </Button>
          <Button style={{marginTop: 10}}>
            From : {format(from, 'dd-MM-yyyy  -  hh:mm aa')}
          </Button>
          <Button style={{marginTop: 10}}>
            To : {format(to, 'dd-MM-yyyy  -  hh:mm aa')}
          </Button>
          <MapView
            initialRegion={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
              longitudeDelta: 0.3,
              latitudeDelta: 0.3,
            }}
            maxZoomLevel={25}
            minZoomLevel={2}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={{
              height: height / 2.5,
              width: '90%',
              marginHorizontal: '5%',
            }}
            showsUserLocation={true}
            apiKey={GOOGLE_MAPS_API_KEY}>
            <Marker
              coordinate={{
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
              }}
            />
          </MapView>
          <TouchableOpacity style={styles.opac} onPress={docPicker}>
            {!upload ? (
              <>
                <Text style={styles.textInput1}>Upload Driving License...</Text>
                <Text style={styles.ico}>
                  <Icon name="upload" type="antdesign" size={32} />
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.textInput1}>{filename}</Text>
                <Text style={styles.ico}>
                  <Icon name="edit" type="material" size={32} />
                </Text>
              </>
            )}
          </TouchableOpacity>
          <Card style={{marginTop: 10, marginHorizontal: '5%', width: '90%'}}>
            <MultiSelect
              items={custome}
              uniqueKey="id"
              ref={dropref}
              onSelectedItemsChange={selected => {
                setCustmize(selected);
              }}
              selectedItems={customize}
              selectText="Customize Your Pickup Truck"
              onChangeInput={text => console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#CCC'}}
              submitButtonColor="black"
              submitButtonText="Select"
            />
          </Card>
          <Button style={{marginTop: 10}}>
            Rate : {fare}Rs - {type}
          </Button>
          <Button
            mode="contained"
            style={{marginHorizontal: '20%', marginVertical: 10}}
            onPress={async () => {
              const req = {
                shop: location.id,
                rate: fare,
                from: String(from),
                to: String(to),
                type: type,
                //license: file,
                rental_type : rental_type
              };
              const config = {
                headers: {
                  "Authorization": token,
                  "Content-Type": "application/json"
                }
              }
              const response = await axios.post(BASE_URL + 'rent/book_rent', req,config)
              setModalVisible(true);
              console.log(req);
              console.log(response.data);
            }}>
            Confirm Booking
          </Button>
        </ScrollView>
      ) : null}
    </>
  );
};

export default RentalFinalBill;

const styles = StyleSheet.create({
  opac: {
    borderRadius: 5,
    borderWidth: 1,
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'black',
    color: 'black',
    marginHorizontal: '10%',
    marginBottom: 20,
    marginTop: 20,
  },
  ico: {
    textAlign: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    padding: 6,
  },
  textInput1: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 40,
    borderColor: 'black',
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

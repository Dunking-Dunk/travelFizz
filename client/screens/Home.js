import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRef, useMemo, useCallback, useEffect } from 'react';
import Map from '../components/MapView';
import BottomSheet from '@gorhom/bottom-sheet';
import Header from '../components/Header.js';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation, route }) => {
  const userLocation = useSelector((state) => state.auth.location)
  const [places, setPlaces] = useState([])
    const bottomSheetRef = useRef()
    const snapPoints = useMemo(() => ['25%', '70%'], []);
    const placeType = 'restaraunt'
    const googleAPIKey = 'AIzaSyAaCWjzUJ1XziqSuWycOTNorOmfe2swDIc'
    let radius = 4 * 1000;
    
    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
      const helper = async() => {

          const url =
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
           userLocation.latitude +
          ','+
          userLocation.longitude +
          '&radius='+
           radius +
          '&key=' +
           googleAPIKey
  
           const res = await axios.get(url)
           for (let googlePlace of res.data.results) {
            var place = {};
            var myLat = googlePlace.geometry.location.lat;
            var myLong = googlePlace.geometry.location.lng;
            var coordinate = {
              latitude: myLat,
              longitude: myLong,
            };
            place['placeTypes'] = googlePlace.types;
            place['coordinate'] = coordinate;
            place['placeId'] = googlePlace.pace_id;
            place['placeName'] = googlePlace.name;
            place['vicinity'] = googlePlace.vicinity
            place['rating'] = googlePlace.user_ratings_total
            setPlaces((state) => ([...state,place]))
      }}

      helper()

    }, [])
   
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Map places={places}/>
            <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={{fontSize: 20, textTransform: 'uppercase', marginBottom: 5}}>Nearby Places</Text>
          {places.map((place, idx) => {
            return (
              <View key={idx} style={styles.cardContainer}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text >{place.placeName}</Text>

<Text >{place.rating}</Text>
                  </View>
                  <Text >{place.vicinity}</Text>
              </View>
            )
          })}
        </View>
        </ScrollView>
      </BottomSheet>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      cardContainer: {
        marginVertical: 10,
        width: '90%',
      }
  });
  
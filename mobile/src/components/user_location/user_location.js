import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import MapViewDirections from 'react-native-maps-directions';

const UserLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const origin = {
        latitude: 10.400696929273314,
        longitude: 105.5029581237249,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0421,
    };
    const destination = {
        latitude: 10.387713407621623,
        longitude: 105.42379917411914,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0421,
    };

    useEffect(() => {
        const getPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied!');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            // console.log(currentLocation);
        };
        getPermission();
    }, []);

    let text = 'Waiting...';
    let region = {};
    let markRegion = {
        latitude: 10.400543,
        longitude: 105.502918,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        vido = location.coords.latitude;
        kinhdo = location.coords.longitude;
        region = {
            latitude: vido,
            longitude: kinhdo,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0421,
        };
        markRegion = {
            latitude: vido,
            longitude: kinhdo,
        };
    }

    return (
        <View style={styles.mapContainer}>
            {/* <View style={styles.yourLocation}>
                    <Text style={styles.text}>Your Location:</Text>
                    <TextInput style={styles.textInput} />
                </View> */}
            <View style={styles.map}>
                <MapView
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    style={styles.map}
                    region={region}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker
                        coordinate={markRegion}
                        title="Your Location"
                        description="You are here"
                    />
                    <Marker coordinate={destination} title="LIMBO COFFEE" />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        strokeColor="#6644ff"
                        apikey={GG_API}
                        strokeWidth={4}
                        onReady={(args) => {
                            console.log(args.distance);
                        }}
                    />
                </MapView>
            </View>
        </View>
    );
};

export default UserLocation;

const styles = StyleSheet.create({
    mapContainer: {
        // marginTop: 200,
    },
    text: {
        padding: 20,
        fontSize: 18,
    },
    map: {
        width: '100%',
        height: '70%',
    },
});

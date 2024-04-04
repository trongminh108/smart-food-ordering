import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/home';
import Locations from './src/pages/locations';
import colors from './src/constants/colors';
import FaceRecognition from './src/pages/face_recognition';

const Stack = createStackNavigator();

export default function App() {
    return (
        // <View style={styles.container}>
        //     <Home />
        //     <StatusBar
        //         translucent={true}
        //         backgroundColor={colors.statusbarBG}
        //     />
        // </View>
        <NavigationContainer>
            <Stack.Navigator style={styles.container}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Locations"
                    component={Locations}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FaceRecognition"
                    component={FaceRecognition}
                />
            </Stack.Navigator>
            <StatusBar
                translucent={true}
                backgroundColor={colors.statusbarBG}
            />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

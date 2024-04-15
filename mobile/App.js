import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/home';
import Locations from './src/screens/locations';
import colors from './src/constants/colors';
import FaceRecognition from './src/screens/face_recognition';
import Faces_Registration from './src/screens/faces_registration';
import MainContainer from './src/containers/main_container';
import GlobalContainer from './src/containers/global_container';

const Stack = createStackNavigator();

export default function App() {
    return (
        // <NavigationContainer>
        //     <Stack.Navigator style={styles.container}>
        //         <Stack.Screen
        //             name="Home"
        //             component={Home}
        //             options={{ headerShown: false }}
        //         />
        //         <Stack.Screen
        //             name="Locations"
        //             component={Locations}
        //             options={{ headerShown: false }}
        //         />
        //         <Stack.Screen
        //             name="FaceRecognition"
        //             component={FaceRecognition}
        //             options={{ headerShown: false }}
        //         />
        //         <Stack.Screen
        //             name="FacesRegistration"
        //             component={Faces_Registration}
        //             options={{ headerShown: false }}
        //         />
        //     </Stack.Navigator>
        //     <StatusBar
        //         translucent={true}
        //         backgroundColor={colors.statusbarBG}
        //     />
        // </NavigationContainer>
        <MainContainer />
    );
}

// AppRegistry.registerComponent('smart_food_ordering', () => App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

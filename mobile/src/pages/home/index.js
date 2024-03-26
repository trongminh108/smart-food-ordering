import { Text, View, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../constants/colors';
import styles from './home.style';

import UserLocation from '../../components/user_location/user_location.js';

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.header}>
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Ionicons
                        name="location-sharp"
                        size={24}
                        color={colors.primary}
                    />
                    <Text>Minh Trong</Text>
                    <Ionicons
                        name="md-chevron-down"
                        size={24}
                        color={colors.black}
                    />
                </View>
                <View>
                    <Ionicons
                        name="notifications-outline"
                        size={24}
                        color={colors.black}
                    />
                </View>
            </View>
            <View style={{ position: 'relative' }}>
                <Image
                    style={styles.banner}
                    source={require('../../../assets/images/banner_home.jpg')}
                />
                <View style={styles.addLocationContainer}>
                    <View style={styles.addLocationForm}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Tìm món ăn"
                            onSubmitEditing={() => {
                                navigation.navigate('Locations');
                            }}
                        />
                    </View>
                </View>
            </View>
            <UserLocation />
        </SafeAreaView>
    );
};

export default Home;

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';

const loading_screen = () => {
    return (
        <View style={styles.loadingScreen}>
            <Text style={styles.textLoading}>Loading...</Text>
            <ActivityIndicator
                size="large"
                style={{ transform: [{ scale: 2 }] }}
            />
        </View>
    );
};

export default loading_screen;

const styles = StyleSheet.create({
    loadingScreen: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.8,
    },
    textLoading: {
        color: 'white',
        marginBottom: 30,
    },
});

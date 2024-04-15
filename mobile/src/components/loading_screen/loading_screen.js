import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

const loading_screen = ({ message }) => {
    return (
        <View style={styles.loadingScreen}>
            <Text style={styles.textLoading}>{message}</Text>
            <ActivityIndicator
                size="large"
                style={{ transform: [{ scale: 2 }] }}
                color={colors.primary}
            />
        </View>
    );
};

loading_screen.defaultProps = {
    message: 'Loading...', // Thiết lập giá trị mặc định cho prop message
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
        color: colors.white,
        marginBottom: 30,
    },
});

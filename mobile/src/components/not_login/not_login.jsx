import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import React from 'react';

import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { LoginName } from '../../constants/screen_names';

const NotLogin = () => {
    const navigation = useNavigation();

    function handlePressLogin() {
        navigation.navigate(LoginName);
    }

    return (
        <View style={styles.accountContainer}>
            <Text>Vui lòng đăng nhập để sử dụng nhiều chức năng hơn</Text>
            <TouchableHighlight
                style={styles.loginButton}
                onPress={handlePressLogin}
                underlayColor={colors.primary_hover}
            >
                <Text style={styles.loginText}>Đăng nhập</Text>
            </TouchableHighlight>
        </View>
    );
};

export default NotLogin;

const styles = StyleSheet.create({
    accountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
    },
    loginButton: {
        marginTop: 20,
        width: '40%',
        height: 48,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: 'white',
        fontSize: 16,
    },
});

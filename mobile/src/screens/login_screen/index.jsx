import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../constants/colors';
import { ICON_SIZE_BIG } from '../../constants/style';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handlePressLogin() {
        alert(username + ' - ' + password);
    }
    function handlePressLoginWithGG() {}

    return (
        <View style={styles.LoginScreenContainer}>
            <View style={styles.ImageContainer}>
                <Image
                    source={require('../../../assets/images/products/cf.jpg')}
                    style={styles.imageStyle}
                />
            </View>
            <View style={styles.formContainer}>
                <View style={[styles.inputText, styles.username]}>
                    <TextInput
                        placeholder="username"
                        style={styles.input}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
                <View style={[styles.inputText, styles.password]}>
                    <TextInput
                        placeholder="password"
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableHighlight
                    style={styles.buttonLogin}
                    onPress={handlePressLogin}
                    underlayColor={colors.primary_hover}
                >
                    <Text style={{ color: colors.white }}>Đăng nhập</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.orderLogin}>
                <Text> - Or Login With - </Text>
                <View>
                    <TouchableHighlight
                        style={styles.buttonLoginWithGG}
                        onPress={handlePressLoginWithGG}
                        underlayColor={colors.primary_hover}
                    >
                        <Image
                            source={require('../../../assets/images/gg.png')}
                            style={styles.imageStyle}
                        />
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    LoginScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageContainer: {
        width: '50%',
        aspectRatio: 1,
        borderRadius: 999,
        overflow: 'hidden',
    },
    imageStyle: { width: '100%', height: '100%' },
    formContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        margin: 8,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 24,
        width: '80%',
        height: 52,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    input: { width: '100%' },
    username: {},
    password: {},
    buttons: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    buttonLogin: {
        marginTop: 20,
        width: '50%',
        height: 48,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderLogin: {
        width: '100%',
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLoginWithGG: {
        marginTop: 16,
        width: 54,
        height: 54,
        overflow: 'hidden',
        backgroundColor: colors.white,
        borderRadius: 54,
    },
});

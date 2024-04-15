import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../constants/colors';
import { ICON_SIZE_BIG } from '../../constants/style';
import { useAuth } from '../../contexts/auth_context';
import { useNavigation } from '@react-navigation/native';

import { isValidEmail } from '../../modules/feature_functions';

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [securePassword, setSecurePassword] = useState(true);
    const { onRegister } = useAuth();

    const navigation = useNavigation();
    async function handlePressRegister() {
        if (username && gmail && password) {
            if (isValidEmail(gmail))
                await onRegister(username, password, gmail);
            else alert('Email chưa đúng');
        } else {
            alert('Vui lòng điền đầy đủ thông tin');
        }
    }

    return (
        <View style={styles.LoginScreenContainer}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.ImageContainer}>
                    <Image
                        source={require('../../../assets/images/products/water.jpg')}
                        style={styles.imageStyle}
                    />
                </View>
                <View style={styles.formContainer}>
                    <View style={[styles.inputText, styles.username]}>
                        <TextInput
                            placeholder="tendangnhap"
                            style={styles.input}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    <View style={[styles.inputText, styles.gmail]}>
                        <TextInput
                            placeholder="gmail"
                            style={styles.input}
                            onChangeText={(text) => setGmail(text)}
                        />
                    </View>
                    <View style={[styles.inputText, styles.password]}>
                        <TextInput
                            placeholder="matkhau"
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={securePassword}
                        />
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight
                        style={[
                            styles.buttonRegister,
                            { backgroundColor: colors.secondary },
                        ]}
                        onPress={handlePressRegister}
                        underlayColor={colors.secondary_hover}
                    >
                        <Text style={{ color: colors.white }}>Đăng ký</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    );
};

export default RegisterScreen;

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
        width: '85%',
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
    buttonRegister: {
        marginTop: 20,
        width: '50%',
        height: 48,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

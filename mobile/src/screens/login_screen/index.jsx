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
import {
    FaceRecognitionName,
    RegisterName,
} from '../../constants/screen_names';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [securePassword, setSecurePassword] = useState(true);
    const { onLogin } = useAuth();

    async function handlePressLogin() {
        // alert(username + ' - ' + password);
        await onLogin(username, password);
    }

    const navigation = useNavigation();
    async function handlePressRegister() {
        navigation.navigate(RegisterName);
    }

    function handlePressLoginWithGG() {}

    function handlePressLoginWithFaceID() {
        navigation.navigate(FaceRecognitionName);
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
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                        Đăng nhập
                    </Text>
                </View>
                <View style={styles.ImageContainer}>
                    <Image
                        source={require('../../../assets/images/products/cf.jpg')}
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
                    <View style={[styles.inputText, styles.password]}>
                        <TextInput
                            placeholder="matkhau"
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={securePassword}
                        />
                    </View>
                </View>
                <View style={[styles.buttons, { flexDirection: 'row' }]}>
                    <TouchableHighlight
                        style={styles.buttonLogin}
                        onPress={handlePressLogin}
                        underlayColor={colors.primary_hover}
                    >
                        <Text style={{ color: colors.white }}>Đăng nhập</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[
                            styles.buttonLogin,
                            { backgroundColor: colors.secondary },
                        ]}
                        onPress={handlePressRegister}
                        underlayColor={colors.primary_hover}
                    >
                        <Text style={{ color: colors.white }}>Đăng ký</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.orderLogin}>
                    <Text> - Hoặc đăng nhập với - </Text>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
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
                        <TouchableHighlight
                            style={[
                                styles.buttonLoginWithGG,
                                { borderWidth: 1, borderColor: colors.primary },
                            ]}
                            onPress={handlePressLoginWithFaceID}
                            underlayColor={colors.primary_hover}
                        >
                            <Image
                                source={require('../../../assets/images/face_recognition.png')}
                                style={[styles.imageStyle]}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
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
        width: '85%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    buttonLogin: {
        marginTop: 20,
        width: '45%',
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

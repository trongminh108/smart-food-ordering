import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    Platform,
    CameraRoll,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const Faces_Registration = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaPermission, setHasMediaPermission] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        const getPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaStatus } =
                await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
            setHasMediaPermission(mediaStatus === 'granted');
        };
        getPermission();
    }, [hasCameraPermission]);

    async function takePicture() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log('Photo:', photo.uri);
            if (photo.uri)
                MediaLibrary.saveToLibraryAsync(photo.uri).then(() =>
                    ToastAndroid.showWithGravity(
                        'Save to gallery',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    )
                );
            ToastAndroid.showWithGravity(
                'You take a photo',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }

    if (!hasCameraPermission || !hasMediaPermission)
        return (
            <View style={styles.container}>
                <Text>
                    You need to grant camera and media permission to this app
                </Text>
            </View>
        );
    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.camera}
                    ref={cameraRef}
                    type={Camera.Constants.Type.front}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takePicture}
                        >
                            <Text style={styles.text}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        </View>
    );
};

export default Faces_Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        width: '90%',
        aspectRatio: 1,
        backgroundColor: 'green',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
});

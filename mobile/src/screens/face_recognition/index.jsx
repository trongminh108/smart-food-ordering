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
import LUXAND_FACE from '../../modules/luxand_api';
import * as FaceDetector from 'expo-face-detector';
import LoadingScreen from '../../components/loading_screen/loading_screen';
import { useAuth } from '../../contexts/auth_context';

const FaceRecognition = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaPermission, setHasMediaPermission] = useState(null);
    const cameraRef = useRef(null);
    const [facesRegis, setFacesRegis] = useState([]);
    const luxand_obj = new LUXAND_FACE();
    const [detectedFaces, setDetectedFaces] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { onLoginWithFaceID } = useAuth();

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

    async function HandleRecognizePerson() {
        setIsLoading(true);
        try {
            if (cameraRef) {
                const photo = await cameraRef.current.takePictureAsync();
                if (showBox)
                    if (photo.uri) {
                        const response = await luxand_obj.RecognizePeople(
                            photo.uri
                        );
                        if (response != []) {
                            // setName(response[0].name);
                            const face_id = await response[0].uuid;
                            onLoginWithFaceID(face_id);
                            // console.log('FACE ID: ', face_id);
                            // luxand_obj.AddFaceToPerson(
                            //     response[0].uuid,
                            //     photo.uri
                            // );
                        }
                    }
            }
        } catch (error) {
            console.error(error);
            setName('Unknown Person');
        } finally {
            setIsLoading(false);
        }
    }

    function handleFaceDetected({ faces }) {
        if (faces.length > 0) {
            setShowBox(true);
            setDetectedFaces(faces);
        } else {
            setShowBox(false);
        }
    }
    function renderFaceBoxes() {
        return detectedFaces.map((face, index) => (
            <View
                key={index}
                style={[
                    styles.faceBox,
                    {
                        left: face.bounds.origin.x,
                        top: face.bounds.origin.y,
                        width: face.bounds.size.width,
                        height: face.bounds.size.height,
                    },
                ]}
            ></View>
        ));
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
            <Text style={styles.textName}>{name}</Text>
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.camera}
                    ref={cameraRef}
                    type={Camera.Constants.Type.front}
                    onFacesDetected={handleFaceDetected}
                    faceDetectorSettings={{
                        mode: FaceDetector.FaceDetectorMode.fast,
                        detectLandmarks:
                            FaceDetector.FaceDetectorLandmarks.none,
                        runClassifications:
                            FaceDetector.FaceDetectorClassifications.none,
                        monDetectionInterval: 100,
                        tracking: true,
                    }}
                >
                    {renderFaceBoxes()}
                </Camera>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={HandleRecognizePerson}
                >
                    <Text style={styles.text}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            {isLoading && <LoadingScreen />}
        </View>
    );
};

export default FaceRecognition;

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
    faceBox: {
        position: 'absolute',
        borderColor: '#005CD6',
        borderWidth: 2,
        borderRadius: 10,
    },
    textName: {
        fontSize: 20,
    },
});

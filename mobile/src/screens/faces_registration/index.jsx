import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import LUXAND_FACE from '../../modules/luxand_api';
import * as FaceDetector from 'expo-face-detector';
import LoadingScreen from '../../components/loading_screen/loading_screen';

const Faces_Registration = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaPermission, setHasMediaPermission] = useState(null);
    const cameraRef = useRef(null);
    const [facesRegis, setFacesRegis] = useState([]);
    const luxand_obj = new LUXAND_FACE();
    const [detectedFaces, setDetectedFaces] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [textName, setTextName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            // if (photo.uri)
            //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() =>
            //         ToastAndroid.showWithGravity(
            //             'Save to gallery',
            //             ToastAndroid.SHORT,
            //             ToastAndroid.BOTTOM
            //         )
            //     );
            // ToastAndroid.showWithGravity(
            //     'You take a photo',
            //     ToastAndroid.SHORT,
            //     ToastAndroid.BOTTOM
            // );
            if (photo.uri) {
                await setFacesRegis((prev) => [...prev, photo.uri]);
            }
        }
    }

    async function AddPerson() {
        setIsLoading(true);
        try {
            if (facesRegis != []) {
                // console.log(facesRegis);
                // console.log(facesRegis);
                await luxand_obj.EnrollPerson(textName, facesRegis);
            }
            // ToastAndroid.showWithGravity(
            //     'Load Complete',
            //     ToastAndroid.SHORT,
            //     ToastAndroid.BOTTOM
            // );
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleFaceDetected({ faces }) {
        if (faces.length > 0) {
            // console.log('faces detected: ', faces);
            setShowBox(true);
            setDetectedFaces(faces);
        } else {
            setShowBox(false);
            // console.log('no faces detected', showBox);
        }
    }

    function handleInputChange(inputValue) {
        setTextName(inputValue);
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
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    margin: 10,
                    paddingHorizontal: 10,
                    width: '90%',
                }}
                placeholder="Type your name..."
                onChangeText={handleInputChange}
                value={textName}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Take Photo</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={AddPerson}>
                    <Text style={styles.text}>Add Person</Text>
                </TouchableOpacity>
            </View>
            {isLoading && <LoadingScreen />}
        </View>
    );
};

export default Faces_Registration;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
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
});

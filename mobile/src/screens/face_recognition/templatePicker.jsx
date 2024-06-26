import {
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    Image,
    Touchable,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

// import * as fs from 'react-native-fs';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import LUXAND_FACE from '../../modules/luxand_api';

const FaceRecognition = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, SetName] = useState('Unknown Person');
    const luxand_obj = new LUXAND_FACE();

    async function handlePicker() {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        };
        const res = await ImagePicker.launchImageLibraryAsync(options);
        // console.log(res);
        if (!res.canceled) setSelectedImage(res.assets[0].uri);
    }

    async function handleSendLuxand() {
        if (selectedImage) {
            const photo = {
                uri: selectedImage,
                name: 'photo.jpg',
                type: 'image/jpeg',
            };
            const data = await luxand_obj.RecognizePeople(photo);
            SetName(data[0].name);
        } else {
            ToastAndroid.show('Please choose your photo', ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.FaceRecognitionContainer}>
            <View>
                <Text>{name}</Text>
            </View>
            <View style={styles.picContainer}>
                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.image}
                    />
                )}
            </View>
            <TouchableOpacity style={styles.buttons} onPress={handlePicker}>
                <Text>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={handleSendLuxand}>
                <Text>Send to API</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FaceRecognition;

const styles = StyleSheet.create({
    FaceRecognitionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picContainer: {
        aspectRatio: 1,
        width: '90%',
        backgroundColor: 'green',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttons: {
        width: '80%',
        padding: 12,
        alignItems: 'center',
        backgroundColor: 'cyan',
        marginTop: 16,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
});

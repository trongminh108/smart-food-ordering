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

const FaceRecognition = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const url = 'https://api.luxand.cloud/photo/search/v2';
    const headers = {
        token: 'e1e78399ff3946948e4ed1e697ac4bb1',
        'Content-Type': 'multipart/form-data',
    };

    async function handlePicker() {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        };
        const res = await ImagePicker.launchImageLibraryAsync(options);
        console.log(res);
        if (!res.canceled) setSelectedImage(res.assets[0].uri);
    }

    async function handleSendLuxand() {
        const form = new FormData();
        form.append('photo', {
            uri: selectedImage,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });
        form.append('collections', '');

        const options = {
            method: 'POST',
            url: url,
            headers: headers,
            data: form,
        };

        try {
            const response = await axios(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.FaceRecognitionContainer}>
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

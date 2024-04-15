import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestScreen = () => {
    const [data, setData] = useState('data');

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/todos/1')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log('Test');
    }, []);

    return (
        <View>
            <Text>TestScreen</Text>
        </View>
    );
};

export default TestScreen;

const styles = StyleSheet.create({});

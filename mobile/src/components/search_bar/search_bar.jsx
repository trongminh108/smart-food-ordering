import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import colors from '../../constants/colors';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SearchBar({ onSubmit }) {
    const navigation = useNavigation();
    const [textSearch, setTextSearch] = useState('');

    return (
        <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Tìm món ăn"
                    onSubmitEditing={() => onSubmit(textSearch)}
                    onChangeText={(e) => setTextSearch(e)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 24,
        width: '95%',
        height: 40,
        // padding: 8,
        paddingLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    textInput: {
        paddingLeft: 8,
        // backgroundColor: 'red',
        flex: 1,
        height: '100%',
    },
});

import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: colors.secondary,
    },
    addLocationContainer: {
        position: 'relative',
    },
    banner: {
        width: '100%',
        height: 260,
        resizeMode: 'stretch',
        position: 'absolute',
    },
    addLocationForm: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 16,
    },
    textInput: {
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 24,
        width: '80%',
        height: 40,
        padding: 8,
    },
});

export default styles;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Rating({ rated }) {
    const stars = 5;
    const integer = Math.floor(rated);
    const decimal = (rated - integer) * 100;
    const rest = stars - Math.ceil(rated);
    const iconName = 'star';

    return (
        // <View style={styles.ratedContainer}>
        //     <View style={styles.starsContainer}>
        //         {Array.from({ length: integer }, (_, index) => (
        //             <View className="star full" key={index}>
        //                 ⭐
        //             </View>
        //         ))}
        //         {decimal !== 0 && (
        //             <View
        //                 className="star"
        //                 style={{
        //                     backgroundImage: `linear-gradient(to right, yellow ${decimal}%, black 0%)`,
        //                 }}
        //             >
        //                 ⭐
        //             </View>
        //         )}

        //         {Array.from({ length: rest }, (_, index) => (
        //             <View className="star empty" key={index}>
        //                 ⭐
        //             </View>
        //         ))}
        //     </View>

        //     <View className="rated">
        //         {rated}/{stars}
        //     </View>
        // </View>
        <View style={styles.starsContainer}>
            {Array.from({ length: integer }, (_, index) => (
                <View key={index}>
                    <Ionicons name={iconName} color={'tomato'} />
                </View>
            ))}
            {decimal != 0 && <Ionicons name={iconName} />}
        </View>
    );
}

const styles = StyleSheet.create({
    starsContainer: {
        flexDirection: 'row',
    },
    // ratedContainer: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    // },
    // starContainer: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     alignItems: 'center',
    // },
    // star: {
    //     fontSize: 12,
    //     // -webkit-background-clip: text;
    //     //     -webkit-text-fill-color: transparent;
    // },
    // full: {},
});

// .ratedContainer {
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: space-between;
//     .starsContainer {
//         display: flex;
//         flex-wrap: wrap;
//         align-items: center;

//         .star {
//             font-size: 12px;
//             // background-image: linear-gradient(to right, yellow 50%, black 50%);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;

//             &.full {
//                 background-image: linear-gradient(
//                     to right,
//                     yellow 100%,
//                     black 0%
//                 );
//             }

//             &.empty {
//                 background-image: linear-gradient(
//                     to right,
//                     black 100%,
//                     yellow 0%
//                 );
//             }
//         }
//     }

//     .rated {
//         margin-top: 3px;
//     }
// }

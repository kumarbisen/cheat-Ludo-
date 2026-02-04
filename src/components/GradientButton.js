import React from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const iconSize = RFValue(22);

const GradientButton = ({ title, onPress, iconColor = '#d5be3e' }) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={styles.btnContainer}>
                <LinearGradient
                    style={styles.button}
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} >
                    {title == 'RESUME' ?
                        (<MaterialIcons name="play-arrow" size={iconSize} color={iconColor} />)
                        : title == 'NEW GAME' ? (<MaterialIcons name="play-circle" size={iconSize} color={iconColor} />)
                            : title == 'VS CPU' ? (<MaterialIcons name="airplay" size={iconSize} color={iconColor} />)
                                : title == 'HOME' ? (<MaterialIcons name="home" size={iconSize} color={iconColor} />)
                                    : <MaterialIcons name="person-4" size={iconSize} color={iconColor} />}
                    <Text style={styles.buttonText}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        marginVertical: 10,
    },
    btnContainer: {
        borderWidth: 2,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        shadowColor: '#d5be3e',
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 10,
        borderColor: '#d5be3e',
        width: 220
    },
    buttonText: {
        color: '#fff',
        fontSize: RFValue(16),
        width: '70%',
        textAlign: 'center',
        fontFamily: 'Philosopher-Bold',
    },
    button: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#000',
    }
});
export default GradientButton;
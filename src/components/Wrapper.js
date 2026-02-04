import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, } from 'react-native-safe-area-context'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import BG from '../assets/images/bg.jpeg'


const Wrapper = ({ children, style }) => {
    return (

        <ImageBackground source={BG} style={styles.container}>
            <SafeAreaView style={[styles.SafeAreaView, { ...styles }]}>
                {children}
            </SafeAreaView>
        </ImageBackground>

    )
}
export default Wrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SafeAreaView: {
        flex: 1,
        width: deviceWidth,
        alignItems: 'center'
    }
})
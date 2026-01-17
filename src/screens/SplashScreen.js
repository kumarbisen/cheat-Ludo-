import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, Image } from 'react-native'
import { deviceWidth, deviceHeight } from '../constants/Scaling'
import Wrapper from '../components/Wrapper'
import { prepareNavigation, resetAndNavigate } from '../helpers/NavigationUtil'

const SplashScreen = () => {
    const [isStop] = useState(false)
    const scale = new Animated.Value(1)

    useEffect(() => {
        prepareNavigation();
        setTimeout(() => {
            resetAndNavigate("HomeScreen")
        }, 2000);
    }, [])

    useEffect(() => {
        const breathingAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.1,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                })
            ])
        )

        if (!isStop) {
            breathingAnimation.start()
        }
        return () => {
            breathingAnimation.stop()
        }
    }, [isStop])



    return (

        <Wrapper>
            <Animated.View style={styles.imgContainer}>
                <Animated.Image source={require('../assets/images/logo.png')} style={[styles.img, { transform: [{ scale }] }]} />
            </Animated.View>

        </Wrapper>

    )
}
export default SplashScreen;
const styles = StyleSheet.create({
    imgContainer: {
        width: deviceWidth * 0.7,
        height: deviceHeight * 0.6,
        justifyContent: "center",
        alignItems: 'center',
    },

    img: {
        height: "100%",
        width: '100%',
        resizeMode: 'contain'



    }
})
import React, { useCallback, useEffect, useRef } from 'react'
import { Alert, Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Wrapper from '../components/Wrapper';
import GradientButton from '../components/GradientButton';
import { deviceWidth } from '../constants/Scaling';
import LottieView from 'lottie-react-native';
import Witch from '../assets/animation/witch.json'
import { playSound } from '../helpers/SoundUtility'
import { useIsFocused } from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import { navigate } from '../helpers/NavigationUtil';
import { useDispatch, useSelector } from 'react-redux'; 
import {selectCurrentPosition} from '../redux/reducers/gameSelectors'
import { resetGame } from '../redux/reducers/gameSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const currentPosition = useSelector(selectCurrentPosition);
    const witchAnim = useRef(new Animated.Value(-deviceWidth)).current;
    const scaleXAnim = useRef(new Animated.Value(-1)).current;
    const isFocused = useIsFocused()



    useEffect(() => {
        if (isFocused) {
            playSound('home')
        }
    }, [isFocused])
    useEffect(() => {
        const loopAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(witchAnim, {
                            duration: 2000,
                            toValue: deviceWidth * 0.02,
                            useNativeDriver: true

                        }),
                        Animated.timing(scaleXAnim, {
                            duration: 0,
                            toValue: -1,
                            useNativeDriver: true

                        })
                    ]),
                    Animated.delay(3000),
                    Animated.parallel([
                        Animated.timing(witchAnim, {
                            duration: 8000,
                            toValue: deviceWidth * 2,
                            useNativeDriver: true

                        }),
                        Animated.timing(scaleXAnim, {
                            duration: 0,
                            toValue: -1,
                            useNativeDriver: true

                        })
                    ]),
                    Animated.parallel([
                        Animated.timing(witchAnim, {
                            duration: 3000,
                            toValue: -deviceWidth * 0.05,
                            useNativeDriver: true

                        }),
                        Animated.timing(scaleXAnim, {
                            duration: 0,
                            toValue: 1,
                            useNativeDriver: true

                        })
                    ]),
                    Animated.delay(2000),
                    Animated.parallel([
                        Animated.timing(witchAnim, {
                            duration: 8000,
                            toValue: -deviceWidth * 2,
                            useNativeDriver: true

                        }),
                        Animated.timing(scaleXAnim, {
                            duration: 0,
                            toValue: 1,
                            useNativeDriver: true

                        })
                    ]),



                ])
            ).start();
        }

        const cleanupAnimation = () => {
            Animated.timing(witchAnim).stop();
            Animated.timing(scaleXAnim).stop()
        }

        loopAnimation();
        return cleanupAnimation;
    }, [witchAnim, scaleXAnim])


    const renderButton = useCallback((title, onPress) => {
        return (
            <GradientButton title={title} onPress={onPress} />
        )

    }, []);


    const startGame = async (isNew = false) => {
        SoundPlayer.stop();
        if (isNew){
            dispatch(resetGame())
        }
        navigate('LudoBoardScreen');
        playSound('game_start')
    }
    const handleNewGamePress = useCallback(() => {
        startGame(true);
    }, []);

    const handleResumeGamePress = useCallback(() => {
        startGame();
    }, []);

    return (
        <Wrapper style={styles.mainContainer}>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.img} />
            </View>
            {currentPosition?.length !== 0 && renderButton('RESUME', handleResumeGamePress)}
            {renderButton('NEW GAME', handleNewGamePress)}
            {renderButton('VS CPU', () => Alert.alert('Info', 'This feature is coming soon!'))}
            {renderButton("2 VS 2", () => Alert.alert('Info', 'This feature is coming soon!'))}


            <Animated.View
                style={[styles.witchContainer, {
                    transform: [{ translateX: witchAnim }, { scaleX: scaleXAnim }]
                }]}
            >

                <Pressable
                    onPress={() => {
                        const random = Math.floor(Math.random() * 3) + 1;
                        playSound(`girl${random}`);
                    }}
                >
                    <LottieView
                        hardwareAccelerationAndroid
                        source={Witch}
                        autoPlay
                        speed={1}
                        style={styles.witch}

                    />
                </Pressable>

            </Animated.View>
            <Text style={styles.artist}>Made By- Vivek Bisen</Text>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "flex-start"
    },
    imgContainer: {

        width: deviceWidth * 0.5,
        height: deviceWidth * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
        alignSelf: 'center'
    },
    img: {
        width: '150%',
        height: '150%',
        resizeMode: 'contain'
    },
    witchContainer: {
        position: 'absolute',
        top: '70%',
        left: '24%'
    },
    witch: {
        height: 250,
        width: 250,
        bottom:40,
        transform: [{ rotate: '25deg' }]
    },
    artist: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        color: 'white',
        fontWeight: '400',
        opacity: 0.5,
        fontStyle: 'italic',
    }
})
export default HomeScreen;
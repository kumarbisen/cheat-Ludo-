import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View, Easing, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPlayerChance, selectDiceRolled } from '../redux/reducers/gameSelectors';
import { BackgroundImage } from '../helpers/GetIcons';
import { playSound } from '../helpers/SoundUtility';
import LottieView from 'lottie-react-native';
import DiceRoll from '../assets/animation/diceroll.json'
import { selectDiceNo } from '../redux/reducers/gameSelectors';
import { LinearGradient } from 'react-native-linear-gradient';



const Dice = React.memo(({ color, rotate, player, data }) => {

    const handleDicePress = () =>{

    }

    const dispatch = useDispatch();
    const currentPlayerChance = useSelector(selectCurrentPlayerChance);
    const isDiceRolled = useSelector(selectDiceRolled);
    const diceNo = useSelector(selectDiceNo);
    const playerPieces = useSelector(state => state.game[`player${currentPlayerChance}`])

    const pileIcon = BackgroundImage.GetImage(color);
    const diceIcon = BackgroundImage.GetImage(diceNo);
    const dalay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const arrowAnim = useRef(new Animated.Value(0)).current;

    const [diceRolling, setDiceRolling] = useState(false);

    useEffect(() => {
        function animateArrow() {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(arrowAnim, {
                        toValue: 10,
                        duration: 600,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true
                    }),
                    Animated.timing(arrowAnim, {
                        toValue: -10,
                        duration: 600,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: true
                    })
                ])
            ).start()
        }

        animateArrow()
    }, [currentPlayerChance, isDiceRolled])
    return (
        <View style={[styles.flexRow, { transform: [{ scaleX: rotate ? -1 : 1 }] }]}>
            <View style={styles.border1}>

                <LinearGradient
                    style={styles.linearGradient}
                    colors={['#0052BE', '#5F9FCB', '#97C6C9']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>
                    <View style={styles.pileContainer}>
                        <Image
                            source={pileIcon}
                            style={styles.pileIcon}
                        />
                    </View>

                </LinearGradient>
            </View>

            <View style={styles.border2}>
                <LinearGradient
                    style={styles.diceGradient}
                    colors={['#aac8ab', '#aac8ab', '#aac8ab']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>

                    <View style={styles.diceContainer}>
                        {((currentPlayerChance === player) && !diceRolling) && (
                            <TouchableOpacity
                                disabled={isDiceRolled}
                                activeOpacity={0.5}
                                onPress={() => handleDicePress(0)}
                                onLongPress={() => handleDicePress(6)}
                            >
                                <Image
                                    source={diceIcon}
                                    style={styles.diceIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </LinearGradient>

            </View>

            {currentPlayerChance == player && !diceRolling ? (
                <Animated.View style={{ transform: [{ translateX: arrowAnim }] }}>
                    <Image source={require('../assets/images/arrow.png')} style={{ width: 50, height: 30 }} />
                </Animated.View>
            ) : null}

            {
                currentPlayerChance == player && diceRolling ? (
                    <LottieView
                        source={DiceRoll}
                        loop={false}
                        autoPlay={true}
                        style={styles.rollingDice}
                        cacheComposition={true}
                        hardwareAccelerationAndroid={true}
                    />) : null
            }


        </View>
    )
})
export default memo(Dice);

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
       
    },
    border1: {
        borderWidth: 3,
        borderRightWidth: 0,
        borderColor: '#f0ce2c'
    },
    border2: {
        borderWidth: 3,
        padding: 1,
        backgroundColor: '#aac8ab',
        borderRadius: 10,
        borderLeftWidth: 3,
        borderColor: '#aac8ab'
    },
    linearGradient: {
        padding: 1,
        borderWidth: 3,
        borderRightWidth: 0,
        borderColor: '#f0ce2c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pileIcon: {
        width: 30,
        height: 30,
    },
    pileContainer: {
        paddingHorizontal: 3,
        paddingVertical: 10,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    diceContainer: {
        backgroundColor: '#e8c0c1',
        borderWidth: 1,
        borderRadius: 5,
        width: 55,
        height: 55,
        paddingVertical: 4,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    diceGradient: {
        borderWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#f0ce2c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    diceIcon: {
        height: 45,
        width: 45
    },
    rollingDice: {
        height: 80,
        width: 80,
        zIndex: 99,
        top: -19,
        left: 38,
        position: 'absolute'
    }
})
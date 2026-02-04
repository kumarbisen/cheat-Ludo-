import React, { useRef, useState } from 'react'
import { Image, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { deviceWidth, deviceHeight } from '../constants/Scaling';
import { StyleSheet } from "react-native";
import Wrapper from '../components/Wrapper';
import menu from "../assets/images/menu.png"
import { playSound } from '../helpers/SoundUtility';
import MenuModal from '../components/MenuModel';
import { Animated } from 'react-native';
import { useEffect } from 'react';
import WinnerModel from '../components/WinnerModel'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Dice from '../components/Dice';
import { selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from '../redux/reducers/gameSelectors';
import { Colors } from '../constants/Colors';
import Pocket from '../components/Pocket';
const LudoBoardScreen = () => {

    const player1 = useSelector(selectPlayer1);
    const player2 = useSelector(selectPlayer2);
    const player3 = useSelector(selectPlayer3);
    const player4 = useSelector(selectPlayer4);
    const isDiceTouched = useSelector(selectDiceTouch);
    const winner = useSelector(state => state.game.winner);


    const opacity = useRef(new Animated.Value(1)).current;
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [showStartImage, setShowStartImage] = useState(true);
    const isFocused = useIsFocused();
    const handleMenuPress = () => {
        playSound('ui');
        setMenuVisible(true);
    }

    useEffect(() => {
        if (isFocused) {
            setShowStartImage(true);
            const blinkAnimation = Animated.loop(Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                })
            ]));

            blinkAnimation.start();

            const timeout = setTimeout(() => {
                blinkAnimation.stop();
                setShowStartImage(false);
            }, 2500);

            return () => {
                blinkAnimation.stop();
                clearTimeout(timeout);
            }
        }

    }, [isFocused]);
    return (
        <Wrapper>
            <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
                <Image source={menu} style={styles.menuIconImage} />
            </TouchableOpacity>

            <View style={styles.container}>
                <View
                    style={styles.flexRow}
                    pointerEvents={isDiceTouched ? 'none' : 'auto'}>
                    <Dice color={Colors.green} player={2} data={player2} />
                    <Dice color={Colors.yellow} player={3} rotate data={player3} />
                </View>
        
                <View style={styles.ludoBoard}>
                    <View style={styles.plotContainer}>
                        <Pocket color={Colors.green} player={2} data={player2} />
                        <Pocket color={Colors.yellow} player={3} data={player3} />
                    </View>
                    <View style={styles.pathContainer}></View>
                    <View style={styles.plotContainer}>
                        <Pocket color={Colors.red} player={1} data={player1} />
                        <Pocket color={Colors.blue} player={4} data={player4} />
                        
                    </View>
                </View>

                <View
                    style={styles.flexRow}
                    pointerEvents={isDiceTouched ? 'none' : 'auto'}>
                    <Dice color={Colors.red} player={1} data={player1} />
                    <Dice color={Colors.blue} player={4} rotate data={player4} />
                </View>

            </View>



            {showStartImage && (
                <Animated.Image
                    source={require('../assets/images/start.png')}
                    style={{
                        height: deviceHeight * 0.2,
                        width: deviceWidth * 0.5,
                        position: 'absolute',
                        opacity: opacity
                    }}
                />
            )}

            {
                isMenuVisible && <MenuModal visible={isMenuVisible} onPressHide={() => setMenuVisible(false)} />
            }

            {
                winner != null && <WinnerModel winner={winner} />
            }

            {isMenuVisible && (
                <MenuModal
                    onPressHide={() => setMenuVisible(false)}
                    visible={isMenuVisible}
                />
            )}

        </Wrapper>
    )
}
export default LudoBoardScreen;


export const styles = StyleSheet.create({

    container: {
        top:130,
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: deviceHeight * 0.5,
        width: deviceWidth
    },

    ludoBoard: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        padding: 10
    },

    menuIcon: {
        position: 'absolute',
        top: 30,
        left: 20,

    },
    menuIconImage: {
        width: 30,
        height: 30,

    },
    flexRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30
    },

    plotContainer:{
        width: '100%',
        height: '40%',
        justifyContent: 'space-between',
       flexDirection: 'row',
       backgroundColor:'#ccc'
    },

    pathContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:'20%',
        width:'100%',
        backgroundColor:'#1E5162'
    }


})
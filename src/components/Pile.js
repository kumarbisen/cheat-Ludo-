import React, { memo, useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { selectCellSelection, selectDiceNo, selectPocketPileSelection } from '../redux/reducers/gameSelectors';
import { Colors } from '../constants/Colors';
import PileGreen from '../assets/images/piles/green.png'
import PileRed from '../assets/images/piles/red.png'
import PileBlue from '../assets/images/piles/blue.png'
import PileYellow from '../assets/images/piles/yellow.png'
import { Image, Animated, Easing } from 'react-native';
import { useEffect } from 'react';
import { Svg, Circle } from 'react-native-svg';



const Pile = ({ cell, pieceId, color, player, onPress }) => {

    const rotation = useRef(new Animated.Value(0)).current;
    const currentPlayerPileSelection = useSelector(selectPocketPileSelection)
    const currentPlayerCellSelection = useSelector(selectCellSelection)
    const diceNo = useSelector(selectDiceNo)
    const playerPieces = useSelector(state => state.game[`player${player}`])

    const isPileEnabled = useMemo(
        ()=> player === currentPlayerPileSelection,
        [player,currentPlayerPileSelection]
    );
    const isCellEnabled = useMemo(
        ()=> player === currentPlayerCellSelection,
        [player,currentPlayerCellSelection]
    );
    const isForwardable = useCallback(() => {

        const piece = playerPieces?.find(item => item.id === pieceId);
        return piece && piece.travelCount + diceNo <= 57
    }, [diceNo, pieceId, playerPieces]);

    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true
            })
        )

        rotateAnimation.start();

        return () => rotateAnimation.stop();
    }, [rotation]);

    const rotateInterpolate = useMemo(() => {
        return rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
    }, [rotation])

    const getPileImage = useMemo(() => {
        switch (color) {
            case Colors.green:
                return PileGreen
            case Colors.red:
                return PileRed
            case Colors.blue:
                return PileBlue
            case Colors.yellow:
                return PileYellow
            default:
                return PileGreen
           
        }
    },[color]);

    return (
        <TouchableOpacity 
        style={styles.container}
         onPress={onPress}
            activeOpacity={0.5}
            disabled={!(cell ? isCellEnabled && isForwardable() : isPileEnabled)}>

                <View style={[styles.hollowCircle,{borderColor: cell ? Colors.transparent : Colors.black}]}>
                {(cell ? isCellEnabled && isForwardable() : isPileEnabled) &&
                    (
                        <View style={styles.dashedCircleContainer}>
                            <Animated.View
                                style={[
                                    styles.dashedCircle,
                                    {
                                        transform: [{ rotate: rotateInterpolate }]
                                    }
                                ]}
                            >
                                <Svg height={"18"} width={"18"}>
                                    <Circle
                                        cx={'9'}
                                        cy={'9'}
                                        r={'8'}
                                        stroke={'white'}
                                        strokeWidth={'2'}
                                        strokeDasharray={'4 4'}
                                        strokeDashoffset={'0'}
                                        fill={'transparent'}
                                    />
                                </Svg>
                            </Animated.View>
                        </View>
                    )
                }
            </View>
                <Image 
                source ={getPileImage}
                style={styles.imageStyle}
                resizeMode='contain'
                />
        </TouchableOpacity>
    )
}
export default memo(Pile);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 32,
        height: 32,
        position: 'absolute',
        top: -16
    },
    hollowCircle: {
        position: 'absolute',
        width: 15,
        height: 15,
        borderRadius: 25,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dashedCircleContainer: {
        position:'absolute',
        height:25,
        width:25,
        justifyContent:'center',
        alignItems:'center',
        top:-8

    },
    dashedCircle: {
        width:25,
        height:25,
        alignItems:'center',
        justifyContent:'center',

    }
})
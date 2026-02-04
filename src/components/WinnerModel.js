import React, { use } from 'react'
import {StyleSheet, Text,View} from 'react-native'
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { resetGame, announceWinner } from '../redux/reducers/gameSlice';
import { useState,useEffect } from 'react';
import { playSound } from '../helpers/SoundUtility';
import GradientButton from './GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { Colors } from '../constants/Colors';
import { resetAndNavigate } from '../helpers/NavigationUtil';
import Pile from './Pile';
import { colorPlayer } from '../helpers/PlotData';






const WinnerModel =({winner})=>{

    const dispatch = useDispatch();
    const [visible,setVisible] = useState(!!winner);

       useEffect(() => {
        setVisible(!!winner);
    }, [winner]);

    const handleNewGame = () => {
        dispatch(resetGame());
        dispatch(announceWinner(null));
        playSound('game_start');
        setVisible(false);
    };

    const handleHome = () => {
        dispatch(resetGame());
        dispatch(announceWinner(null));
       resetAndNavigate('HomeScreen');
       setVisible(false);
    };


    return(
        <Modal
            style={styles.modal}
            isVisible={visible}
            backdropColor="black"
            backdropOpacity={0.8}
            onBackdropPress={() => { }}
            animationIn="zoomIn"
            animationOut="zoomOut"
            onBackButtonPress={() => { }}
        >
            <LinearGradient
                colors={['#0f0c29', '#302b63', '#24243e']}
                style={styles.gradientContainer}
            >
                <View style={styles.content}>

                    <View style={styles.pileContainer}>
                        <Pile player={winner} color={colorPlayer[winner - 1]} />
                    </View>
                    <Text style={styles.congratsText}> Congratulations! PLAYER {winner}</Text>
                    <LottieView
                        autoPlay
                        hardwareAccelerationAndroid
                        loop={true}
                        source={require('../assets/animation/trophy.json')}
                        style={styles.trophyAnimation}
                    />
                    <LottieView
                        autoPlay
                        hardwareAccelerationAndroid
                        loop={true}
                        source={require('../assets/animation/firework.json')}
                        style={styles.fireworkAnimation}
                    />
                    <GradientButton title='NEW GAME' onPress={handleNewGame} />
                    <GradientButton title='HOME' onPress={handleHome} />
                </View>
            </LinearGradient>
            <LottieView
                autoPlay
                hardwareAccelerationAndroid
                loop={true}
                source={require('../assets/animation/girl.json')}
                style={styles.girlAnimation}
            />




        </Modal>
    )
}
export default WinnerModel;

const styles = StyleSheet.create({
      modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradientContainer: {
        borderRadius: 20,
        padding: 20,
        width: '96%',
        borderWidth: 2,
        borderColor: 'gold',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '96%',
        alignItems: 'center',
        zIndex: 5
    },
    trophyAnimation: {
        height: 200,
        width: 200,
        marginTop: 20
    },
    fireworkAnimation: {
        width: 200,
        height: 500,
        position: 'absolute',
        bottom: 200
    },
    girlAnimation: {
        width: 380,
        height: 500,
        position: 'absolute',
        bottom: -200,
        right: -120,
        zIndex: 0
    },
    congratsText: {
        fontSize: 18,
        color: Colors.white || '#FFFFFF',
        fontFamily: 'Philosopher-Bold',
        marginTop: 10,
        zIndex: 10
    }
    ,
    pileContainer: {
        width: 90,
        height: 40,
    },
})
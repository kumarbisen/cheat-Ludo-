import React, { useCallback } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import Wrapper from '../components/Wrapper';
import GradientButton from '../components/GradientButton';
import { deviceWidth } from '../constants/Scaling';


const HomeScreen = () => {
    const renderButton = useCallback((title, onPress) => { 
        return (
            <GradientButton title={title} onPress={onPress} />
        )

     }, []);

     const handleNewGamePress = useCallback(() => { {
        Alert.alert('Info', 'New Game Started!');
     } }, []);

    return (
        <Wrapper style={styles.mainContainer}>
            <View style = {styles.imgContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.img} />
            </View>

            {renderButton('NEW GAME', handleNewGamePress)}
            {renderButton('VS CPU', ()=> Alert.alert('Info', 'This feature is coming soon!'))}
            {renderButton("2 VS 2",()=> Alert.alert('Info', 'This feature is coming soon!'))}
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'flex-start',
    },
    imgContainer:{

        width:deviceWidth *0.5,
        height:deviceWidth *0.2,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:40,
        alignSelf:'center'
    },
    img:{
        width:'150%',
        height:'150%',
        resizeMode:'contain'
    }
})
export default HomeScreen;
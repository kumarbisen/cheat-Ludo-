import React from 'react'
import {StyleSheet, Text,View} from 'react-native'
import Pile from './Pile'


const Plot =({color,player,pieceNo,data,onPress })=>{
     return (
        <View style={[styles.plot, { backgroundColor: color }]}>
            {data && data[pieceNo]?.pos === 0 && (
               
                <Pile
                    color={color}
                    player={player}
                    cell={false}
                    pieceId={data[pieceNo].id}
                    onPress={() => onPress(data[pieceNo])}
                />
            )}
        </View>
    )
}
export default (Plot);

const styles = StyleSheet.create({

    plot: {
        height: '80%',
        width: '36%',
        borderRadius: 100
    }

})
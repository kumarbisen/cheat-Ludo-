import React from 'react'
import {StyleSheet, Text,View} from 'react-native'
import { Colors } from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux';
import { ArrowSpot, SafeSpots, StarSpots } from '../helpers/PlotData';
import { selectCurrentPosition } from '../redux/reducers/gameSelectors';
import { useCallback, useMemo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize';
import Pile from './Pile';

const Cell =({id, color})=>{

     const dispatch = useDispatch();
    const plotedPiece = useSelector(selectCurrentPosition);

     const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id]);
    const isStarSpot = useMemo(() => StarSpots.includes(id), [id]);
    const isArrowSpot = useMemo(() => ArrowSpot.includes(id), [id]);

     const arrowValue = id === 38 ? '180deg' : id === 25 ? '90deg' : id === 12 ? '0deg' : '-90deg';

    const peicesAtPosition = useMemo(() => plotedPiece.filter((item) => item.pos == id), [plotedPiece, id])

     const handlePress = useCallback((playerNo, pieceId) => {
        // dispatch(handleForwardThunk(playerNo, pieceId, id));
    }, [dispatch, id]);

    return(

       
        <View style={[styles.container,{backgroundColor: isSafeSpot? color: 'white'}]}>
            {isStarSpot && <Ionicons name="star-outline" size={RFValue(12)} color={Colors.grey}/>}
            {isArrowSpot && <Ionicons name="arrow-forward-outline" size={RFValue(12)} color={Colors.grey} style={{ transform: [{ rotate: arrowValue }] }}/>}
            {peicesAtPosition.map((piece, index)=>{
                const playerNo = piece.id[0] === "A" ? 1 : piece.id[0] === "B" ? 2 : piece.id[0] === "C" ? 3 : 4;
                const pieceColor = piece.id[0] === "A" ? Colors.red : piece.id[0] === "B" ? Colors.green : piece.id[0] === "C" ? Colors.yellow : Colors.blue;

                return (
                    <View
                        key={piece.id}
                        style={[
                            styles.pieceContainer,
                            {
                                transform: [
                                    {
                                        scale: peicesAtPosition.length === 1 ? 1 : 0.7
                                    },
                                    {
                                        translateX: peicesAtPosition.length === 1 ? 0 : index % 2 === 0 ? -6 : 6
                                    },
                                    {
                                        translateY: peicesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6
                                    }
                                ]
                            }
                        ]}
                    >
                        <Pile
                            cell={true}
                            player={playerNo}
                            onPress={() => handlePress(playerNo, piece.id)}
                            pieceId={piece.id}
                            color={pieceColor}
                        />
                    </View>
                )

            })}
        </View>
    )
}
export default Cell;
 
const styles = StyleSheet.create({
    container:{
        borderWidth:0.4,
        borderColor:Colors.borderColor,
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    pieceContainer:{
        position:'absolute',
        top:0,
        bottom:0,
        zIndex:99
    }
})
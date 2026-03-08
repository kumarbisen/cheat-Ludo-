import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Cell from './Cell'


const HorizontalPath = ({ color, cells }) => {

    const groupedCells = useMemo(() => {
        const groups = [];
        for (let i = 0; i < cells.length; i += 6) {
            groups.push(cells.slice(i, i + 6));
        }
        return groups
    }, [cells])

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {groupedCells.map((group, groupIndex) => (
                    <View
                        key={`group-${groupIndex}`}
                        style={styles.cellContainer}>
                        {group.map((id, index) => (

                            <Cell key={`cell-${id}`} cell={true} index={`${groupIndex}, ${index}`} id={id} color={color} />
                        ))}
                    </View>

                ))}

            </View>
        </View>
    )
}
export default HorizontalPath;

const styles = StyleSheet.create({
    container: {
        width: '40%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cellContainer: {
        flexDirection: 'row',
        width: '16.7%',
        height: '33.3%'
    }

})
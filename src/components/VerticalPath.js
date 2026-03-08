import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { memo, useMemo } from 'react'
import Cell from './Cell'


const VerticalPath = ({ color, cells }) => {

    const groupedCells = useMemo(() => {
        const groups = [];
        for (let i = 0; i < cells.length; i += 3) {
            groups.push(cells.slice(i, i + 3));
        }

        return groups;
    }, [cells])
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                {groupedCells.map((group, groupIndex) => (
                    <View
                        key={`group-${groupIndex}`}
                        style={styles.cellContainer}>
                        {group.map((id, index) => (

                            <Cell key={`cell-${id}`} cell={true} index={`${groupIndex}, ${index}`}id={id} color={color} />
                        ))}

                    </View>
                ))}
            </View>
        </View>
    )
}
export default memo(VerticalPath);


const styles = StyleSheet.create({
    container: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cellContainer: {
        flexDirection: 'row',
        width: '33.3%',
        height: '16.67%'
    }
})
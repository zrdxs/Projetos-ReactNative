import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

const style = StyleSheet.create({
    display:{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end',
    },
    displayContent:{
        fontSize: 50,
        color: '#fff',
    }
})

export default props => {
    return <View style={style.display}>
        <Text style={style.displayContent} numberOfLines={1}>{props.value}</Text>
    </View>
}
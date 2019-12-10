import React from 'react'
import { View, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        height: '100%'
    },
    norte:{
        flex: 1, //(1 para o norte)
        backgroundColor:'#bdf9ed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centro:{
        flex: 2,//divide de acordo com a priorida, a partir da soma dos pesos (2 parte para centro)
        flexDirection: 'row',
        backgroundColor: '#f2f9bd',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    sul:{
        flex: 1,
        backgroundColor: '#bdf9c4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circulo:{
        width: 100,
        height: 100,
        backgroundColor: '#f47f61',
        borderRadius: 50,
    }
})

const Circulo = props =>
    <View style={styles.circulo}></View>
//função anonima, componente funcional??
export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.norte}>
                <Circulo/>
            </View>
            <View style={styles.centro}>
                <Circulo/>
                <Circulo/>
                <Circulo/>
            </View>  
            <View style={styles.sul}>
                <Circulo/>
            </View>
        </View>
    )

}
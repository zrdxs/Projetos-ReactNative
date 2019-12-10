import React, { Component } from 'react'
import {View, Text, TextInput} from 'react-native'
import Padrao from '../estilos/Padrao'

export const Entrada = props => {
    return <View>
        <TextInput value={props.texto}
                style={Padrao.input}
                onChangeText={props.chamarQuandoMudar}/>
    </View>
}

export class TextoSincronizado extends Component {

    state = {
        texto:''
    }

    AlterarTexto = texto => {
        this.setState({ texto })
    }

    render() {
        return (
            <View>
                <Text style={Padrao.fonte40}>{this.state.texto}</Text>
                <Entrada texto={this.state.texto}
                        chamarQuandoMudar={this.AlterarTexto}/>
            </View>
        )
    }

}


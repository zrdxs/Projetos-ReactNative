import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Contador extends Component{
//Obrigatoriamente retorna o render

    state = {
        numero: 0 //this.props.numeroInicial para passar por parametro a inicialização
    };

    //usando construtor para a chamada e atribuição na função
    constructor(props){
        super(props);
        //parecido com o java, o this do bind() informa que sera usado o valor
        //passado na hora que invocou a função
        this.maisUm = this.maisUm.bind(this);

    }

    //no caso, não vai precissar de arrow function
    maisUm(){
        this.setState({ numero: this.state.numero + 1})
    };

    limpar = () => {
        this.setState({ numero: 0})
    }

    render() {
        return (
            <View>
                <Text style={{fontSize: 30}}>{this.state.numero}</Text>
                <TouchableHighlight
                    onPress={this.maisUm}
                    onLongPress={this.limpar}
                    >
                    <Text>Inclementar/Limpar</Text>
                </TouchableHighlight>
            </View>
        )
    }

}
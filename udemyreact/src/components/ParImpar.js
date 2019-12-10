import React from 'react';
import {View, Text} from 'react-native';
import Padrao from '../estilos/Padrao';

export default function(props){
    return props.numero % 2 == 0
    ? <Text style ={Padrao.ex}>Par</Text>
    : <Text style ={Padrao.ex}>Impar</Text>
}

import React from 'react';
import { Text } from 'react-native';
import Padrao from '../estilos/Padrao';

//export default function(props){
    
    //return <Text>{props.texto}</Text>
//}

//Usando Arrow Function
export default (props) => <Text style = {[Padrao.ex]}> Arrow Function: {props.texto}</Text>
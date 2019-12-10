import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Simples from './components/Simples';
import ParImpar from './components/ParImpar';
import {Inverter, MegaSena} from './components/Multi';
import Contador from './components/Contador';
import Plataforma from './components/Plataformas';
import ValidarProps from './components/ValidarProps'
import Evento from './components/Evento'
import { Avo } from './components/ComunicacaoDireta'
import {TextoSincronizado} from './components/ComunicacaoIndireta'
import ListaFlex from './components/ListaFlex'
import Flex from './components/Flex'

const navigator = createDrawerNavigator({
    Flex:{
        screen: () => <Flex/>
    },
    ListaFlex:{
        screen: () => <ListaFlex/>,
        navigationOptions: {title:'Lista Flex - Alunos'}
    },
    TextoSincronizado:{
        screen: () => <TextoSincronizado/>,
        navigationOptions: {title:'Texto - Sincronizado'}
    },
    Avo:{
        screen: () => <Avo nome = 'João' sobrenome='Silva'/>
    },
    Evento:{
        screen: () => <Evento/>
    },
    ValidarProps:{
        screen: () => <ValidarProps ano={19}/>
    },
    Plataforma:{
        screen: () => <Plataforma/>
    },
    Contador:{
        screen: () => <Contador /*numeroIncial={100}*/ />
    },
    MegaSena:{
        screen: () => <MegaSena numeros = {6} />,
        navigationOptions: {title: 'Mega Sena'}
    },
    Inverter:{
        screen: () => <Inverter texto='Marcelo Zardo' />
    },
    ParImpar:{
        screen: () => <ParImpar numero = {9}/>,
        navigationOptions: {title: 'Par e Impar'}
    },
    Simples:{
        screen: () => <Simples texto = 'Flexível!!' />,
        navigationOptions: {title: 'Texto Invertido'}
    }

}, { drawerWidth: 300 });

const App = createAppContainer(navigator);
 
export default App;
import React from 'react'
import { View, Text} from 'react-native'

const fonte = {style:{fontSize: 30}};

function FilhosComProps(props){
    return React.Children.map(props.children, c=> React.cloneElement(c, { ...props, ...c.props}))
}

export const Filho = props => 
    <View>
        <Text {...fonte}>Filho: {props.nome} {props.sobrenome}</Text>
    </View>


export const Pai = props => 
    <View>
        <Text {...fonte}>Pai: {props.nome} {props.sobrenome}</Text>
        {props.children}
        {/*FilhosComProps(props) */}
    </View>

//o pai com '...props' recebe os valores do avo
//o props.sobrenome recebe de forma explicita do avo
export const Avo = props => 
    <View>
        <Text {...fonte}>Avo: {props.nome} {props.sobrenome}</Text>                      
        <Pai nome='Andre' sobrenome={props.sobrenome}>
            <Filho nome='Ana'/>
            <Filho nome='Gui'/>
            <Filho nome='Davi'/>
        </Pai>
        <Pai {...props} nome='Pedro'>
            <Filho nome='Rebeca' />
            <Filho nome='Renato' />
        </Pai>
    </View>

import React from 'react'
import { ScrollView, View, FlatList, Text} from 'react-native'

const alunos = [
    {id:1, nome: 'Luis',nota: 6.3 },
    {id:2, nome: 'Julia',nota: 7.0 },
    {id:3, nome: 'Larissa',nota: 4.3 },
    {id:4, nome: 'Vitoria',nota: 8.3 },
    {id:5, nome: 'Zardo',nota: 9.7 },
    {id:6, nome: 'Asian Guy',nota: 2.0 },
    {id:7, nome: 'Indian Guy',nota: 15.0 },
    {id:8, nome: 'Matheus',nota: 8.9 },
    {id:9, nome: 'Lucas',nota: 8.9 },

    {id:11, nome: 'Luis',nota: 6.3 },
    {id:12, nome: 'Julia',nota: 7.0 },
    {id:13, nome: 'Larissa',nota: 4.3 },
    {id:14, nome: 'Vitoria',nota: 8.3 },
    {id:15, nome: 'Zardo',nota: 9.7 },
    {id:16, nome: 'Asian Guy',nota: 2.0 },
    {id:17, nome: 'Indian Guy',nota: 15.0 },
    {id:18, nome: 'Matheus',nota: 8.9 },
    {id:19, nome: 'Lucas',nota: 8.9 },
]

const itemEstilo = {
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#DDD',
    borderWidth: 0.5,
    borderColor: '#222',

    //Flex
    alignItems: 'center', //ira aplicar no EIXO SEGUNDARIO, cross axys
    flexDirection: 'row', //atributo que muda o main axy, nesse caso para a linha
    justifyContent: 'space-between', //ira aplicar no EIXO PRINCIPAL
}

export const Aluno = props =>{
    return <View style={itemEstilo}>
        <Text>Nome: {props.nome}</Text>
        <Text style={{fontWeight: 'bold'}}>Nota: {props.nota}</Text>
    </View>
}

export default props => {
    //o ({item}) é o atributo do objeto que esta sendo acessado.
    //como se fosse o aluno.item, mas nesse caso está indo direto no 'item'
    const renderItem = ({item}) =>{
        return <Aluno {...item} />
    }

    return (
        <ScrollView>
            <FlatList data={alunos} renderItem={renderItem}
            keyExtractor={(_,index) => index.toString()}/>
        </ScrollView>
    )
}













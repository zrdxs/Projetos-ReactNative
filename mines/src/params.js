import { Dimensions } from 'react-native';

const params = {
    blockSize: 25,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15,//proporção painel superior tela
    difficultLevel: 0.1,
    getColumnsAmount(){
        //pegando a coluna de acordo com tamanho horizontal
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }

};

export default params;
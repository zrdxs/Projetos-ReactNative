import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import Params from './src/params';
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/screens/LevelSelection'
import { 
    createBoardMine,
    cloneBoard,
    openField,
    hadExploded,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed 
  } from './src/functions'
import params from './src/params';

export default class App extends Component {

  constructor(props){
    super(props);
    //criando o estado direto
    this.state = this.createState();
  }

  minesAmount = () => {
    const rows = Params.getRowsAmount();
    const column = Params.getColumnsAmount();
    return Math.ceil(rows * column * Params.difficultLevel)
  }

  //função para criar o tabuleiro, usando createdBoardMine e passando os param
  createState = () =>{
    const rows = Params.getRowsAmount();
    const columns = Params.getColumnsAmount();
    return {
      board: createBoardMine(rows, columns ,this.minesAmount()),
      won: false,
      lose: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row, column) =>{
    //clonando o board, para não mexer no original
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lose = hadExploded(board)
    const won = wonGame(board)

    if(lose){
      showMines(board);
      Alert.alert("Perdeuuuuu!!", "Infelizmente Você Perdeu :(");
    }

    if(won){
      Alert.alert("Parabéns!!", "Você Venceu!!");
    }
    //alterando o estado do board
    this.setState({board,lose,won});
    
  }

  //função da bandeira
  onSelectField = (row, column) =>{
      const board = cloneBoard(this.state.board);
      invertFlag(board, row, column);
      const won = wonGame(board);

      if(won){
        Alert.alert("Parabens!!", "Você Venceu!!");
      }

      this.setState({board, won});
  }

  //setar um nivel de acordo com a % passada pelo parametro
  //setar um novo estado usando o create state e passando o difficultLevel para ser alterado
  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
        <View style={styles.container}>
          <LevelSelection isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({ showLevelSelection: false })}/>
          <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} 
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({ showLevelSelection: true })} />
          <View style={styles.board}>
            <MineField board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField} />           
          </View>      
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
});

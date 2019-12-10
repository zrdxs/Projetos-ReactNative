//Lógica do jogo para criação do tabuleiro com as minas
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            //criando obj
            return{
                //valores dos fields
                row,
                column,
                opened: false,
                mined: false,
                flagged: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
} 

const spreadMines = (board, minesAmount) => {
    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;

    while(minesPlanted < minesAmount){
        const rowSel = parseInt(Math.random() * rows, 10);
        const columnSel = parseInt(Math.random() * columns, 10);

        if(!board[rowSel][columnSel].mined){
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

const createBoardMine = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns);
    spreadMines(board,minesAmount);
    
    return board;
}

const cloneBoard = board =>{
    return board.map(rows =>{
        return rows.map(field =>{
            return {...field }
        })
    })
}

//método para descobrir os vizinhos
const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1];
    const columns = [column - 1, column, column + 2];
    rows.forEach(r => {
        columns.forEach(c =>{
            const different = r !== row || c !== column;
            const validRow = r >= 0 && r < board.length;
            const validColumn = c >= 0 && c < board[0].length;
            if(different && validRow && validColumn){
                neighbors.push(board[r][c]);//prestar atenção nos parametros board[][]
            }
        })
    })
    return neighbors;
}
//verificando se a vizinhança é segura
const safeNeighborhood = (board, row, column) =>{
    const safes = (result, neighbor) => result && !neighbor.mined;
    //testar essa parte
    return getNeighbors(board, row, column).reduce(safes, true);
}

//função para abrir os campos de forma recursiva
const openField = (board, row, column) =>{
    const field = board[row][column]
    if(!field.opened) {
        field.opened = true
        if(field.mined){
            field.exploded = true
            //verificando se é uma vizinhança segura
        }else if(safeNeighborhood(board, row, column)){
            //chamando os vizinhos
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))   
        }else {
            const neighbors = getNeighbors(board, row, column);
            field.nearMines = neighbors.filter(n => n.mined).length;
        }
    }
}
//transformando o board em um array de campos
//array function ja possui return implicito

const fields = board => [].concat(...board)
const hadExploded = board => fields(board)
    .filter(field => field.exploded).length > 0
const pendding = field => (field.mined && !field.flagged)
    || (!field.mined && !field.opened)
const wonGame = board => fields(board).filter(pendding).length === 0
const showMines = board => fields(board).filter(field => field.mined)
.forEach(field => field.opened = true)

const invertFlag = (board, row, column) =>{
    const field = board[row][column]
    field.flagged = !field.flagged
}

//função para calcular quantas flags foram usada no jogo
const flagsUsed = board => fields(board).filter(f => f.flagged).length

export {
    createBoardMine,
    cloneBoard,
    openField,
    hadExploded,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed, 
}
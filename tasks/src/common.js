import { Alert, Platform } from 'react-native'

//nessa caso está fazendo a verificação pelo fato
//do backend estar local
const server = Platform.OS == 'ios' ?
    'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)

}

export { server, showError }
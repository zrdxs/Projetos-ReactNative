import React, { Component } from 'react'

import { connect } from 'react-redux'
import { login } from '../store/actions/user'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import CommonStyles from '../CommonStyles'


class Login extends Component {
        state = {
            name: '',
            email: '',
            password: ''
        }

        componentDidUpdate = prevProps => {
            if(prevProps.isLoading == true && this.props.isLoading == false){
                this.props.navigation.navigate('Profile')

            }
        }

        login = () => {
            this.props.onLogin({ ...this.state })
        }

        render(){
            return(
              <View style={styles.container}>
                  <TextInput placeholder='E-mail' style={CommonStyles.input}
                        autoFocus={true} keyboardType='email-address'
                        value={this.state.email} onChangeText={email => this.setState({ email })} />
                  <TextInput placeholder='Senha' style={CommonStyles.input}
                        secureTextEntry={true} value={this.state.password}
                        onChangeText={password => this.setState({password})} />
                  <TouchableOpacity onPress={this.login} style={CommonStyles.buttom}>
                        <Text style={CommonStyles.buttomText}>Login</Text>    
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                      this.props.navigation.navigate('Register')
                  }} style={CommonStyles.buttom}>
                        <Text style={CommonStyles.buttomText}>Criar Conta...</Text>    
                  </TouchableOpacity> 
              </View>  
            )
        }
}

const mapStateToProps = ({ user }) => ({
    isLoading: user.isLoading
});

//mapeia os métodos para serem disparado no reducer de acordo com o Type:
const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}
  


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

//export default Login
export default connect(mapStateToProps,mapDispatchToProps)(Login);
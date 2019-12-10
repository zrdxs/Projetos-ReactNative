import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import CommonStyles from '../CommonStyles'
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

class Register extends Component {
    state = {
        name: '',
        password: '',
        email: ''
    }

    componentDidUpdate = prevProps => {
        if(prevProps.isLoading == true && this.props.isLoading == false){
            //zerando o formulario
            this.setState({
                name: '',
                password: '',
                email: ''
            })
            this.props.navigation.navigate('Feed')
        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder='Nome' style={styles.input} value={this.state.name}
                autoFocus={true} onChangeText={name => this.setState({name})} />
                <TextInput placeholder='Email' style={styles.input} value={this.state.email}
                keyboardType='email-address' onChangeText={email => this.setState({email})} />
                <TextInput placeholder='Senha' style={styles.input} value={this.state.password}
                secureTextEntry={true} onChangeText={password => this.setState({password})} />
                <TouchableOpacity 
                        onPress={() => { this.props.onCreateUser(this.state)}} 
                        style={CommonStyles.buttom}>
                    <Text style={CommonStyles.buttomText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input:{
        ...CommonStyles.input,
        paddingLeft: 15
    }
})

const mapStateToProps = ({ user }) => ({
    isLoading: user.isLoading
});

const mapDispatchToProps = dispatch => ({
     onCreateUser: user => dispatch(createUser(user))
})

//export default Register

export default connect(mapStateToProps,mapDispatchToProps)(Register)
import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../commonStyles'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'
import { server, showError } from '../common'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImgae from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

//import AsyncStorage from '@react-native-community/async-storage';

export default class Agenda extends Component {

    state = {
        tasks: [ ],

        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    }
    
    //Adicionando tasks e mandando os dados por parametro
    addTask = async task =>{
        try{
            await axios.post(`${server}/tasks`, {
                desc: task.desc,
                estimateAt: task.date,
        })

            this.setState({ showAddTask: false}, this.loadTasks)
        } catch (err){
            showError(err)
        }
    }

    //função para deletar a task, passando para o compo filho
    //to do: fazer uma segunda forma apenas mudando o estado da task
    deleteTask = async id => {
        try{
            await axios.delete(`${server}/tasks/${id}`)
            await this.loadTasks()
        } catch (err){
            showError(err)
        }
        
    }

    /*deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({tasks}, this.filterTasks);
    }*/

    //filtrando as tasks
    filterTasks = () => {
        let visibleTasks = null;
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
        
    }

    //alterando o estado de true e false para exibir as tasks concluidas
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }
    //função executada assim que o componente é montado
    componentDidMount = async () => {
        this.loadTasks()
    }

    //criando a função para selecionar a task
    //se ID for restritamente igual o ID da task selecionada
    toggleTask =  async id =>{
        try{
            await axios.put(`${server}/tasks/${id}/toggle`)
            await this.loadTasks()
        } catch (err) {
            showError(err)
        }
    }
    //com filter
    /*toggleTask = id =>{
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === id){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks })
    }*/

    loadTasks = async () => {
        try {
            const maxDate = moment().add({days: this.props.daysAhead }).format('YYYY-MM-DD 23:49')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (err) {
            showError(err)
        } 
    }

    render() {

        let styleColor = null;
        let image = null

        switch(this.props.daysAhead){
            case 0: {
                styleColor = commonStyles.colors.today
                image = todayImage
                break;
            }
            case 1: {
                styleColor = commonStyles.colors.tomorrow
                image = tomorrowImgae
                break;
            }
            case 7: {
                styleColor = commonStyles.colors.week
                image = weekImage
                break;
            }
            default: {
                styleColor = commomStyles.colors.month
                image = monthImage
                break;
            }
        }

        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                        onSave={this.addTask}
                        onCancel={() => {this.setState({showAddTask: false}) }} />
                <ImageBackground source={image} 
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color={commomStyles.colors.secondary}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commomStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMM [de] YYYY')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        //usando o destructor
                        renderItem={({item}) => <Task {...item}
                        onToggleTask={this.toggleTask}
                        onDelete={this.deleteTask} />}
                    />
                </View>
                <ActionButton buttonColor={styleColor}
                    onPress={() => {this.setState({showAddTask: true
                         }) }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taskContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})


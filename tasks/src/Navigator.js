import React from 'react'
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import Agenda from './screens/Agenda'
import Menu from './screens/Menu'
import Auth from './screens/Auth'
import commonStyles from './commonStyles'
import AuthOrApp from './screens/AuthOrApp'

//rotas do drawernavigator
const MenuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <Agenda title='Hoje' daysAhead={0} {...props}/>,
        navigationOptions: {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <Agenda title='Amanhã' daysAhead={1} {...props}/>,
        navigationOptions: {
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <Agenda title='Semana' daysAhead={7} {...props}/>,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <Agenda title='Mês' daysAhead={30} {...props}/>,
        navigationOptions: {
            title: 'Mês'
        }
    }
}

//configuração do Drawer
const MenuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle:{
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle: {
            color:'#080',
        },
        drawerPosition: 'left'
    }
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, MenuConfig)

//criando as rotas
const MainRoutes = {
    Loading: {
        name: 'Loading',
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        //já foi chamado la em cima, ao invés de passar o caminho
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: MenuNavigator
        //screen: () = props => {caso fosse passar propriedade}
    }
}

const MainNavigator = createSwitchNavigator(MainRoutes, {initialRouteName: 'Loading'})

export default MainNavigator
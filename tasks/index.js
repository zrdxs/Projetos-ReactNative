/**
 * @format
 */
import {YellowBox} from 'react-native'
import {AppRegistry} from 'react-native';
//import Agenda from './src/screens/Agenda'
import Navigator from './src/Navigator'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);

YellowBox.ignoreWarnings([ 'DrawerLayoutAndroid drawerPosition',
                            'componentWillReceiveProps is deprecated',
                            'componentWillMount',
                            'componentWillReceiveProps has been renamed',
                        ]);
/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.apiURL = 'http://buyingagentba-9tmjk-env.ap-southeast-2.elasticbeanstalk.com'

AppRegistry.registerComponent(appName, () => App);

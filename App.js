import {createBottomTabNavigator } from 'react-navigation';
import HomeView from './app/home/Home';
import AdminStackNavigator from './app/admin/Admin';
import ReportView from './app/report/Report';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthView from './app/auth/Auth'
import AuthLoadingView from'./app/auth/AuthLoading'

const AppStack = createBottomTabNavigator({
  Home: HomeView,
  Admin: AdminStackNavigator,
  Report:ReportView
},{
  initialRouteName: 'Home'
  });

const AuthStack = createStackNavigator({ Auth: AuthView });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingView,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);





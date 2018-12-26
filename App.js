import {createBottomTabNavigator } from 'react-navigation';
import HomeView from './app/home/Home';
import AdminStackNavigator from './app/admin/Admin';
import ReportView from './app/report/Report';


export default createBottomTabNavigator({
  Home: HomeView,
  Admin: AdminStackNavigator,
  Report:ReportView
},{
  initialRouteName: 'Home'
  });









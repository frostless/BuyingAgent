import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  TabView,
  TabBar,
  SceneMap,
  type Route,
  type NavigationState,
} from 'react-native-tab-view';
import HomeView from './tabs/home/Home';
import DeleteView from './tabs/delete/Delete';
import AddView from './tabs/add/Add';
import ReportView from './tabs/report/Report';


type State = NavigationState<
  Route<{
    key: string,
    title: string,
  }>
>;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class BuyingAgentTopBars extends React.Component<*, State> {
  static title = 'BuyingAgent';
  static backgroundColor = '#3f51b5';
  static appbarElevation = 0;

  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home' },
      { key: 'add', title: 'Add' },
      { key: 'report', title: 'Report' },
      { key: 'delete', title: 'Delete' }
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });

  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  _renderScene = SceneMap({
    home: HomeView,
    add: AddView,
    report: ReportView,
    delete: DeleteView
  });

  render() {
    return (
      <TabView
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  tabbar: {
    backgroundColor: '#2196f3',
  },
  tab: {
    width: 97,
    marginTop:15
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
});









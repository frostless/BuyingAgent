import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAllVisitsAsyn } from '../services/FetchManage'
import renderIf from '../services/RenderIf'

export default class VisitsDetailsView extends Component {
  static navigationOptions = {
    title: 'Visits Details',
  };

  componentDidMount() {
    this.mounted = true;
    getAllVisitsAsyn.call(this);
  }

  componentWillUnmount() {
    this.mounted = false; //anti pattern https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount
  }

  DeleteEntity(id, index) {
    return fetch(`${apiURL}/api/delete/`, {
      method: 'Delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entity: 'visit',
        id: id
      }),
    }).then((response) => {
      if (response.status == 200) {
        let visitsNew = this.state.visits;
        visitsNew.splice(index, 1);
        this.setState({ visits: visitsNew }, () => this.forceUpdate());
      }
      else Alert.alert('An error occured, please try again')
      this.setState({ isLoading: false });
    })
      .catch((error) => {
        Alert.alert(error)
        console.error(error);
        this.setState({ isLoading: false });
      });
  }

  state = {
    isLoading: true,
    visits: [],
  };

  renderRow(item, index) {
    return (
      <View key={item.id} style={{ flex: 0, height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Id: {item.id}</Text>
          <Text>Started Time: {item.startedTime}</Text>
        </View>
        <TouchableHighlight
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            Alert.alert(
              'BuyingAgent',
              `Are you sure that you want to delete visit with id ${item.id} and potentially its associated transactions from the system?`,
              [
                { text: 'Later', style: 'cancel' },
                { text: 'Cancel', style: 'destructive' },
                {
                  text: 'Confirm', onPress: () => {
                    this.setState({ isLoading: true });
                    this.DeleteEntity(item.id, index)
                  },
                  style: 'default'
                },
              ],
              { cancelable: false }
            )
          }
          }
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.view}
      >
        <View style={{ paddingLeft: 20, paddingRight: 20, minHeight: Dimensions.get('window').height }}>
          <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {
              this.state.visits.map((item, index) => {
                return this.renderRow(item, index);
              })
            }
          </View>
        </View>
        {renderIf(this.state.isLoading)(
          <View pointEvents='none' style={styles.indicator}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 8,
    marginLeft: 8
  },
  deleteButton: {
    backgroundColor: '#32CD32',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold'
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#F5FCFF88',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
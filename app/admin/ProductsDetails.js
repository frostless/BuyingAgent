import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAllProductsAsyn } from '../services/FetchManage'
import SegmentedControl from '../customComponents/SegmentedControl'
import AddProduct from './AddProduct'
import renderIf from '../services/RenderIf'

export default class ProductsDetailsView extends Component {
  static navigationOptions = {
    title: 'Products Details',
  };

  constructor(props) {
    super(props);
    this.AddHandler = this.AddHandler.bind(this);
    this.CancelAddHandler = this.CancelAddHandler.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    getAllProductsAsyn.call(this);
  }

  componentWillUnmount() {
    this.mounted = false; //anti pattern https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount
  }

  state = {
    addable: false,
    indexForEdit: null,
    isLoading: true,
    products: [],
  };

  DeleteEntity(id, index) {
    token(this.props.navigation).then((token) => {
      if(!token) return;
      return fetch(`${apiURL}/api/delete/`, {
        method: 'Delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          entity: 'product',
          id: id
        }),
      }).then((response) => {
        if (response.status == 200) {
          let productsNew = this.state.products;
          productsNew.splice(index, 1);
          this.setState({ prodcuts: productsNew }, () => this.forceUpdate());
        }
        else Alert.alert('An error occured, please try again')
        this.setState({ isLoading: false });
      })
        .catch((error) => {
          Alert.alert(error)
          console.error(error);
          this.setState({ isLoading: false });
        });
    })
  }

  AddHandler(productNew) {
    this.setState({
      addable: false
    })
    let productsNew = this.state.products;
    productsNew.push(productNew);
    this.forceUpdate();
  }

  CancelAddHandler() {
    this.setState({
      addable: false
    })
  }

  OnGoBack(productNew) {
    let productsNew = this.state.products;
    //update the base products array
    productsNew[this.state.indexForEdit] = productNew;
    this.forceUpdate();
  }

  renderRow(item, index) {
    if (this.state.categoryId && item['categoryId'] != this.state.categoryId) return; //filter the unwanted catgegory
    return (
      <View key={item.id} style={{ flex: 0, height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1 }}>
        <Text style={{ flex: 1 }}>{item.name}</Text>
        <TouchableHighlight
          style={[styles.button, styles.editButton]}
          onPress={() => {
            let objectToSend = item;
            objectToSend['goBack'] = this.OnGoBack.bind(this);
            this.setState({ indexForEdit: index })
            this.props.navigation.navigate('EditProduct', objectToSend);
          }
          }
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            Alert.alert(
              'BuyingAgent',
              `Are you sure that you want to delete ${item.name} from the system?`,
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
          <SegmentedControl
            customStyle={{ marginBottom: 8, marginTop: 8 }}
            callbackiOS={(event) => {
              let index = event.nativeEvent.selectedSegmentIndex; //1 formular 2 supplements depends on remote db
              this.setState({ categoryId: Number(index) + 1 })
              this.forceUpdate();
            }}
            callbackAndroid={(index) => {
              this.setState({ categoryId: Number(index) + 1 })
              this.forceUpdate();
            }}
          />
          <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {
              this.state.products.map((item, index) => {
                return this.renderRow(item, index);
              })
            }
          </View>
          <View style={{ height: 8 }}></View>
          {renderIf(!this.state.addable)(
            <TouchableHighlight
              style={[styles.button, styles.addButton]}
              onPress={() => {
                this.setState({ addable: true })
              }
              }
            >
              <Text style={styles.btnText}>Add</Text>
            </TouchableHighlight>
          )}
          {renderIf(this.state.addable)(
            <AddProduct AddHandler={this.AddHandler} CancelAddHandler={this.CancelAddHandler} />
          )}
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
  addButton: {
    backgroundColor: '#2a95e9',
  },
  deleteButton: {
    backgroundColor: '#32CD32',
  },
  editButton: {
    backgroundColor: '#2a95e9',
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
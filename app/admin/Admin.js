import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation';
import ProductsDetailsView from './ProductsDetails'
import CustomersDetailsView from './CustomersDetails'
import EditCustomerView from './EditCustomer'
import EditProductView from './EditProduct'
import VisitsDetailsView from './VisitsDetails'
import TransactionssDetailsView from './TransactionsDetails'
import CategoriesDetailsView from './CategoriesDetails'

class AdminView extends React.Component {
    static navigationOptions = {
      title: 'Home',
  };
  state = {
    names: [
      {
        id: 0,
        name: 'Shops',
      },
      {
        id: 1,
        name: 'Posts',
      },
      {
        id: 2,
        name: 'Categories',
      },
      {
        id: 3,
        name: 'Products',
      },
      {
        id: 4,
        name: 'Customers',
      },
      {
        id: 5,
        name: 'Visits',
      },
      {
        id: 6,
        name: 'Transactions',
      }
    ]
  }
  
  render() {
    return (
      <View>
        {
          this.state.names.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.container}
              onPress={() => this.props.navigation.navigate(item.name)}
              >
              <Text style={styles.text}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
}

export default createStackNavigator({
  AdminRoot: AdminView,
  Products: ProductsDetailsView,
  EditProduct: EditProductView,
  Customers: CustomersDetailsView,
  EditCustomer: EditCustomerView,
  Visits: VisitsDetailsView,
  Transactions: TransactionssDetailsView,
  Categories:CategoriesDetailsView
}, {
    initialRouteName: 'AdminRoot'
  })

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#2a95e9',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
})

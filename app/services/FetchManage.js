export function getAllCustomersAsyn() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/allCustomers`, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (this.mounted) {
          this.setState({ customers: responseJson, isLoading: false }, () => this.forceUpdate());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getAllCategoriesAsyn() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/allCategories`, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (this.mounted) {
          this.setState({ categories: responseJson, isLoading: false }, () => this.forceUpdate());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getAllProductsAsyn() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/allProducts`, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (this.mounted) {
          this.setState({ products: responseJson, isLoading: false }, () => this.forceUpdate());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getAllVisitsAsyn() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/allVisits`, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (this.mounted) {
          this.setState({ visits: responseJson, isLoading: false }, () => this.forceUpdate());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getAllTransactionsAsyn() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/allTransactions`, {
      method: 'Get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (this.mounted) {
          this.setState({ transactions: responseJson, isLoading: false }, () => this.forceUpdate());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })
}




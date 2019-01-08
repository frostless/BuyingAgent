export function getAllCustomersAsyn() {
  return fetch(`${apiURL}/api/reports/allCustomers`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (this.mounted) {
        this.setState({ customers: responseJson, isLoading: false },() => this.forceUpdate());
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getAllCategoriesAsyn() {
  return fetch(`${apiURL}/api/reports/allCategories`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (this.mounted) {
        this.setState({ categories: responseJson, isLoading: false },() => this.forceUpdate());
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getAllProductsAsyn() {
  return fetch(`${apiURL}/api/reports/allProducts`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (this.mounted) {
        this.setState({ products: responseJson, isLoading: false },() => this.forceUpdate());
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getAllVisitsAsyn() {
  return fetch(`${apiURL}/api/reports/allVisits`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (this.mounted) {
        this.setState({ visits: responseJson, isLoading: false },() => this.forceUpdate());
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getAllTransactionsAsyn() {
  return fetch(`${apiURL}/api/reports/allTransactions`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (this.mounted) {
        this.setState({ transactions: responseJson, isLoading: false },() => this.forceUpdate());
      }
    })
    .catch((error) => {
      console.error(error);
    });
}




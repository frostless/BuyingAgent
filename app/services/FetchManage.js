export function getAllCustomersAsyn() {
    return fetch(`${apiURL}/api/reports/allCustomers`)
      .then((response) => response.json())
      .then((responseJson) => {
        if(this.mounted){
          this.setState({ customers: responseJson, isLoading: false });
          this.forceUpdate()//for native script to re-render
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
      if(this.mounted){
        this.setState({ products: responseJson, isLoading: false });
        this.forceUpdate()//for native script to re-render
      }   
    })
    .catch((error) => {
      console.error(error);
    });
  }
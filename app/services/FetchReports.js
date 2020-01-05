const pieChartColors = ['#600080', '#9900cc', '#1100fc', '#100080', '#300080'];

export function getTopCustomer() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/topCustomer`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          topCustomer: responseJson,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getTopProduct() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/topProduct`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          topProduct: responseJson,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getTopPost() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/topPost`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          topPost: responseJson,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getTopVisit() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/topVisit`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        responseJson['date'] = responseJson['date'].split(' ')[0];//get the //dd//mm//yy format
        this.setState({
          topVisit: responseJson,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getTransactionsNum() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/transactionsNum`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          transactionsNum: responseJson,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}
export function getVisitsNum() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/visitsNum`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          visitsNum: responseJson,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getAllProfit() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/allProfit`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          allProfit: responseJson,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getMonthsProfit() {
  token(this.props.navigation).then((token) => {
    if (!token) return;
    return fetch(`${apiURL}/api/reports/monthsProfit`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
      // If no transaction in the specified year so far, return a static empty array
      if (response.ok) {
        return response.json();
      } else {
        return { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 };
      }
    })
      .then((responseJson) => {
        var arr = [];
        for (var o in responseJson) {
          var data = responseJson[o];
          arr.push(data);
        }
        this.setState({
          monthlyProfitData: arr,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getFormulaProfit() {
  return token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/formulaProfit`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getSupplementsProfit() {
  return token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/supplementsProfit`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getTopFiveCustomers() {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/reports/topfivecustomers`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        let datatoReturn = [];
        for (let i = 0; i < responseJson.length; i++) {
          let customer = {};
          let svg = {};
          svg['fill'] = pieChartColors[i];
          customer['key'] = i + 1;
          customer['amount'] = Number(responseJson[i]['profit']);
          customer['name'] = responseJson[i]['name'];
          customer['svg'] = svg;
          datatoReturn.push(customer);
        }
        this.setState({
          topFiveCustomerData: datatoReturn,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function getFormulaSupplementsCom() {

  let formulaPromise = getFormulaProfit.call(this);
  let suppplementPromise = getSupplementsProfit.call(this);
  let datatoReturn = [];

  formulaPromise
    .then(
      (data) => {
        let formulaSVG = {};
        let formulaProfit = {};
        formulaSVG['fill'] = pieChartColors[1];
        formulaProfit['key'] = 1;
        formulaProfit['amount'] = Number(data);
        formulaProfit['name'] = 'Formula';
        formulaProfit['svg'] = formulaSVG;
        datatoReturn.push(formulaProfit);
      })
    .catch((error) => {
      console.error(error);
    });

  suppplementPromise
    .then(
      (data) => {
        let supplementSVG = {};
        let supplementProfit = {};
        supplementSVG['fill'] = pieChartColors[2];
        supplementProfit['key'] = 2;
        supplementProfit['amount'] = Number(data);
        supplementProfit['name'] = 'Supplements';
        supplementProfit['svg'] = supplementSVG;
        datatoReturn.push(supplementProfit);
        this.setState({
          formulaSupplementsData: datatoReturn,
          isLoading: false
        });
      })
    .catch((error) => {
      console.error(error);
    });

}









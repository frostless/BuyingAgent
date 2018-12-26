const pieChartColors = ['#600080','#9900cc','#1100fc','#100080','#300080'];

export function getTopCustomer() {
  return fetch(`${apiURL}/api/reports/topCustomer`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        topCustomer: responseJson,
        isLoading:false
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getTopProduct() {
  return fetch(`${apiURL}/api/reports/topProduct`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        topProduct: responseJson,
        isLoading:false
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getTopPost() {
  return fetch(`${apiURL}/api/reports/topPost`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        topPost: responseJson,
        isLoading:false
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getTopVisit() {
  return fetch(`${apiURL}/api/reports/topVisit`)
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson['date'] = responseJson['date'].split(' ')[0];//get the //dd//mm//yy format
      this.setState({ 
        topVisit: responseJson,
        isLoading:false
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getTransactionsNum() {
  return fetch(`${apiURL}/api/reports/transactionsNum`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        transactionsNum: responseJson,
        isLoading:false
       });
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getVisitsNum() {
  return fetch(`${apiURL}/api/reports/visitsNum`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        visitsNum: responseJson,
        isLoading:false
       });
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getAllProfit() {
  return fetch(`${apiURL}/api/reports/allProfit`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        allProfit: responseJson,
        isLoading:false
       });
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getMonthsProfit() {
  return fetch(`${apiURL}/api/reports/monthsProfit`)
    .then((response) => response.json())
    .then((responseJson) => {
      var arr = [];
      for (var o in responseJson) {
        var data = responseJson[o];
        arr.push(data);
      }
      this.setState({ 
        monthlyProfitData: arr,
        isLoading:false
       });
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getFormulaProfit() {
  return fetch(`${apiURL}/api/reports/formulaProfit`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}
export function getSupplementsProfit() {
  return fetch(`${apiURL}/api/reports/supplementsProfit`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getTopFiveCustomers() {
  return fetch(`${apiURL}/api/reports/topfivecustomers`)
    .then((response) => response.json())
    .then((responseJson) => {
      let datatoReturn= [];
      for(let i = 0; i < responseJson.length;i++){
        let customer = {};
        let svg = {};
        svg['fill'] = pieChartColors[i];
        customer['key'] = i+1;
        customer['amount'] = Number(responseJson[i]['profit']);
        customer['name'] = responseJson[i]['name'];
        customer['svg'] = svg;
        datatoReturn.push(customer);
      }
      this.setState({ 
        topFiveCustomerData: datatoReturn,
        isLoading:false
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getFormulaSupplementsCom() {

  let formulaPromise= getFormulaProfit();
  let suppplementPromise = getSupplementsProfit();
  let datatoReturn= [];
  
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
          isLoading:false
        });
      })
      .catch((error) => {
        console.error(error);
      });
    
   
   
}









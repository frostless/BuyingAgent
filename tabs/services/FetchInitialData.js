

export function getInitialInfoAsyn() {
    return fetch('http://buyingagentba-9tmjk-env.ap-southeast-2.elasticbeanstalk.com/api/initialinfo/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.state.initialInfo = responseJson;
        createCustomers.call(this);
        createProducts.call(this);
        creatPosts.call(this);
        creatShops.call(this);
        this.forceUpdate()//for native script to re-render
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createCustomers(){
    var oriArr = this.state.initialInfo['customers'];
    var arr = [];
    var obj = {};
    for(var i = 0; i < oriArr.length; i++){
     arr.push(oriArr[i]['name'])
     obj[oriArr[i]['name']]=oriArr[i]['id']
  }
  this.state.customers = arr;
  this.state.customerDic = obj;
}
 
  function createProducts(){
    var oriArr = this.state.initialInfo['products'];
    let products = [];
    let formulaArr = [];
    let supplementsArr = [];
    var obj = {};
    for(var i = 0; i < oriArr.length; i++){
      var priceObj = {};
      priceObj['price'] = oriArr[i]['price'];
      priceObj['charged'] = oriArr[i]['charged'];
      priceObj['id'] = oriArr[i]['id'];
      priceObj['profit'] = oriArr[i]['profit'];
      obj[oriArr[i]['name']] = priceObj;
     
      if (oriArr[i]['categoryId'] == "1")
        formulaArr.push(oriArr[i]['name'])
      else
        supplementsArr.push(oriArr[i]['name'])
  }
  this.state.formula = this.state.products = formulaArr;
  this.state.supplements = supplementsArr;
  this.state.productDic = obj;
}

function creatPosts(){
  var oriArr = this.state.initialInfo['posts'];
  var arr = [];
  var obj = {};
  for(var i = 0; i < oriArr.length; i++){
   arr.push(oriArr[i]['brand'])
   obj[oriArr[i]['brand']]=oriArr[i]['id'];
}
this.state.posts = arr;
this.state.postDic = obj;
}

function creatShops(){
  var oriArr = this.state.initialInfo['shops'];
  var arr = [];
  var obj = {};
  for(var i = 0; i < oriArr.length; i++){
   arr.push(oriArr[i]['name'])
   obj[oriArr[i]['name']]=oriArr[i]['id'];
}
this.state.shops = arr;
this.state.shopDic = obj;
}

export function AddNewVisit(time, shopId) {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/addnew/newVisit`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        StartedTime: time,
        ShopId: shopId,
      }),
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({
        visitId: responseJson['id'],
        isLoading: false
      });
    })
      .catch((error) => {
        console.error(error);
      });
  })
}

export function PatchNewVisit(visitId, finishedTime) {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/update/visit/${visitId}`, {
      method: 'Patch',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify([{
        'op': 'replace',
        'path': '/FinishedTime',
        'value': finishedTime,
      }]),
    }).then((responseJson) => {
      this.setState({
        isVisitEndable: false,
        isLoading: false
      });
      this.CleanUp(true);
    })
      .catch((error) => {
        console.error(error);
      });
  })
}



export function AddNewTransaction(objToSend) {
  token(this.props.navigation).then((token) => {
    if(!token) return;
    return fetch(`${apiURL}/api/addnew/newTransaction`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(objToSend),
    }).then((responseJson) => {
      this.setState({
        isVisitEnabled: true,
        isLoading: false
      });
      this.CleanUp(false);
    })
      .catch((error) => {
        console.error(error);
      });
  })
}




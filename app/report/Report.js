import React from 'react';
import { BarChart, XAxis,PieChart } from 'react-native-svg-charts'
import { View, StyleSheet, ScrollView, Text, TouchableHighlight, ActivityIndicator } from 'react-native'
import { getTopCustomer, getTopProduct, getTopVisit, getTopPost, getTransactionsNum, getVisitsNum, getMonthsProfit, getAllProfit, getFormulaSupplementsCom,getTopFiveCustomers } from '../services/FetchReports'
import renderIf from '../services/RenderIf';
import * as scale from 'd3-scale'
import { Text as SVGChartText} from 'react-native-svg';
import StatusBarBackground from '../customComponents/StatusBarBackground'

class ReportView extends React.PureComponent {

  state = {
    topCustomer: {},
    topProduct: {},
    topPost: {},
    topVisit: {},
    allProfit: null,
    transactionsNum: null,
    visitsNum: null,
    monthlyProfitData:[],
    topFiveCustomerData:[],
    formulaSupplementsData:[],
  }

  render() {
//labels reusable for pie charts
  const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
          const { labelCentroid, pieCentroid, data } = slice;
          return (
              <SVGChartText
                  key={index}
                  x={pieCentroid[ 0]}
                  y={pieCentroid[ 1 ]}
                  fill={'white'}
                  textAnchor={'middle'}
                  alignmentBaseline={'middle'}
                  fontSize={18}
                  stroke={'black'}
                  strokeWidth={0.2}
              >
                  {data.name}
              </SVGChartText>
          )
      })
  }
    return (
      <View style={styles.view}>

        <ScrollView>
        <StatusBarBackground></StatusBarBackground>

          {renderIf(this.state.topCustomer['name'])(
            <Text style={styles.reportText}>{"name:" + this.state.topCustomer['name']}{" profit:" + this.state.topCustomer['profit']}</Text>
          )}

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getTopCustomer.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get Top Customer</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getTopFiveCustomers.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get Top Five Customers</Text>
          </TouchableHighlight>

          {renderIf(this.state.topFiveCustomerData.length > 0)(
            <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={this.state.topFiveCustomerData}
              spacing={0}
              outerRadius={'95%'}
            >
              <Labels />
            </PieChart>
          )}
          
          
          {renderIf(this.state.topProduct['productName'])(
            <Text style={styles.reportText}>{"name:" + this.state.topProduct['productName']}{" profit:" + this.state.topProduct['profit'] + " since 06/05/18"}</Text>
          )}

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getTopProduct.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get Top Product</Text>
          </TouchableHighlight>

          {renderIf(this.state.topPost['postBrand'])(
            <Text style={styles.reportText}>{"name:" + this.state.topPost['postBrand']}</Text>
          )}

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getTopPost.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get Top Post</Text>
          </TouchableHighlight>

          {renderIf(this.state.topVisit['date'])(
            <Text style={styles.reportText}>{"shop:" + this.state.topVisit['shop']}{" profit:" + this.state.topVisit['profit']}{" date:" + this.state.topVisit['date']}{" elased:" + this.state.topVisit['timeElapsed']}</Text>
          )}

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getTopVisit.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get Top Visit</Text>
          </TouchableHighlight>

          {renderIf(this.state.transactionsNum)(
            <Text style={styles.reportText}>{"total:" + this.state.transactionsNum}</Text>
          )}
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getTransactionsNum.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get Transactions Number</Text>
          </TouchableHighlight>

          {renderIf(this.state.visitsNum)(
            <Text style={styles.reportText}>{"total:" + this.state.visitsNum}</Text>
          )}
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getVisitsNum.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get Visits Number</Text>
          </TouchableHighlight>

          {renderIf(this.state.allProfit)(
            <Text style={styles.reportText}>{"total:" + this.state.allProfit}</Text>
          )}
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getAllProfit.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get All Profit</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getFormulaSupplementsCom.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Compare Formula and Supplements</Text>
          </TouchableHighlight>

          {renderIf(this.state.formulaSupplementsData.length > 0)(
            <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={this.state.formulaSupplementsData}
              spacing={0}
              outerRadius={'95%'}
            >
              <Labels />
            </PieChart>
          )}

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.setState({ isLoading: true });
              getMonthsProfit.call(this)
            }
            }
          >
            <Text style={styles.btnText}>Get Months Profit Report For This Year</Text>
          </TouchableHighlight>

          {renderIf(this.state.monthlyProfitData.length > 0)(
            <View style={{ height: 200 }}>
              <BarChart
                style={{ flex: 1 }}
                data={this.state.monthlyProfitData}
                gridMin={0}
                svg={{ fill: 'rgb(134, 65, 244)' }}
              />
              <XAxis
                style={{ marginTop: 10 }}
                data={this.state.monthlyProfitData}
                scale={scale.scaleBand}
                formatLabel={(value, index) => index + 1}
                labelStyle={{ color: 'black' }}
              />
            </View>
          )}

        </ScrollView>

        {renderIf(this.state.isLoading)(
          <View pointEvents='none' style={styles.indicator}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

      </View>
    )

  }
}

export default ReportView


const styles = StyleSheet.create({
  view: {
    padding:20
  },
  reportText: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2a95e9',
    padding: 10,
    marginBottom: 8
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
  }
})
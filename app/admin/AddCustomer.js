import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Platform, ActivityIndicator, Alert } from 'react-native'
import { TimeGenerator } from '../services/Helpers'
import DatePicker from 'react-native-datepicker'
import renderIf from '../services/RenderIf'

export default class AddCustomer extends Component {
    state = {
        isValidated: false,
        name: null,
        province: null,
        gender: null,
        relationship: null,
        customerSince: TimeGenerator(false),
        isLoading: false
    }

    AddNewCustomer(name, province, gender, relationship, customerSince) {
        token(this.props.navigation).then((token) => {
            if(!token) return;
            return fetch(`${apiURL}/api/addnew/newcustomer`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    name: name,
                    province: province,
                    gender: gender,
                    relationship: relationship,
                    customerSince: customerSince
                }),
            }).then(async (response) => {
                if (response.status == 200) {
                    let responseJson = await response.json();
                    Alert.alert(
                        'BuyingAgent',
                        `${name} has been added to the system successfully!`,
                        [
                            {
                                text: 'Confirm', onPress: () => {
                                    let customerNew = {
                                        id: responseJson.id,
                                        name: this.state.name,
                                        province: this.state.province,
                                        gender: this.state.gender,
                                        relationship: this.state.relationship,
                                        customerSince: this.state.customerSince
                                    }
                                    this.props.AddHandler(customerNew)
                                }
                                , style: 'default'
                            },
                        ],
                        { cancelable: false }
                    )
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

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.name}
                        onChangeText={(text) => {
                            this.setState({ name: text })
                        }
                        }
                    />
                </View>
                {!!this.state.nameError && (
                    <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                )}
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Province:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.province}
                        onChangeText={(text) => {
                            this.setState({ province: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Gender:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.gender}
                        onChangeText={(text) => {
                            this.setState({ gender: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Relationship:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.relationship}
                        onChangeText={(text) => {
                            this.setState({ relationship: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Customer Since:</Text>
                    <DatePicker
                        style={{ marginLeft: 8, width: 200 }}
                        date={this.state.customerSince}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ customerSince: date }); }}
                    />
                </View>
                <View style={{ height: 8 }}></View>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <TouchableHighlight
                        style={[styles.button, styles.addButton]}
                        onPress={() => {
                            if (!this.state.name) {
                                this.setState(() => ({ nameError: "Customer name required." }));
                            } else {
                                this.setState({ isLoading: true, nameError: null });
                                this.AddNewCustomer(this.state.name, this.state.province, this.state.gender, this.state.relationship, this.state.customerSince);
                            }
                        }
                        }
                    >
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => {
                            this.props.CancelAddHandler();
                        }
                        }
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableHighlight>
                </View>

                {renderIf(this.state.isLoading)(
                    <View pointEvents='none' style={styles.indicator}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
            </View>
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
    textInput: {
        height: 20,
        minWidth: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 8,
        ...Platform.select({
            android: { paddingVertical: 0 }
        }),
    },
    text: {
        width: 83,
    },
    addButton: {
        backgroundColor: '#2a95e9',
    },
    deleteButton: {
        backgroundColor: '#32CD32',
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
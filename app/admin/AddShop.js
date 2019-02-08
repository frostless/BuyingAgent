import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Platform, ActivityIndicator, Alert } from 'react-native'
import renderIf from '../services/RenderIf'

export default class AddShop extends Component {
    state = {
        isValidated: false,
        name: null,
        address: null,
        contactNo: null,
        weChatNo: null,
        isLoading: false
    }

    AddNewShop(name, address, contactNo, weChatNo) {
        token(this.props.navigation).then((token) => {
            if(!token) return;
            return fetch(`${apiURL}/api/addnew/newshop`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    contactNo: contactNo,
                    weChatNo: weChatNo
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
                                    let shopNew = {
                                        id: responseJson.id,
                                        name: this.state.name,
                                        address: this.state.address,
                                        contactNo: this.state.contactNo,
                                        weChatNo: this.state.weChatNo
                                    }
                                    this.props.AddHandler(shopNew)
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
                    <Text style={styles.text}>Address:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.address}
                        onChangeText={(text) => {
                            this.setState({ address: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Contact No:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.contactNo}
                        onChangeText={(text) => {
                            this.setState({ contactNo: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>WeChat No:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.weChatNo}
                        onChangeText={(text) => {
                            this.setState({ weChatNo: text })
                        }
                        }
                    />
                </View>

                <View style={{ height: 8 }}></View>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <TouchableHighlight
                        style={[styles.button, styles.addButton]}
                        onPress={() => {
                            if (!this.state.name) {
                                this.setState(() => ({ nameError: "Shop name required." }));
                            } else {
                                this.setState({ isLoading: true, nameError: null });
                                this.AddNewShop(this.state.name, this.state.address, this.state.contactNo, this.state.weChatNo);
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
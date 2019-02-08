import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Platform, ActivityIndicator, Alert } from 'react-native'
import renderIf from '../services/RenderIf'

export default class AddPost extends Component {
    state = {
        isValidated: false,
        type: null,
        brand: null,
        expectedTime: null,
        price: null    
    }

    AddNewPost(type, brand, expectedTime, price) {
        token(this.props.navigation).then((token) => {
            if(!token) return;
            return fetch(`${apiURL}/api/addnew/newpost`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    type: type,
                    brand: brand,
                    expectedTime: expectedTime,
                    price: price
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
                                    let postNew = {
                                        id: responseJson.id,
                                        type: this.state.type,
                                        brand: this.state.brand,
                                        expectedTime: this.state.expectedTime,
                                        price: this.state.price
                                    }
                                    this.props.AddHandler(postNew)
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
                        value={this.state.brand}
                        onChangeText={(text) => {
                            this.setState({ brand: text })
                        }
                        }
                    />
                </View>
                {!!this.state.nameError && (
                    <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                )}
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Type:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.type}
                        onChangeText={(text) => {
                            this.setState({ type: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Expected Delivery Time:</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='decimal-pad'
                        value={this.state.expectedTime}
                        onChangeText={(text) => {
                            this.setState({ expectedTime: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Price:</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='decimal-pad'
                        value={this.state.price}
                        onChangeText={(text) => {
                            this.setState({ price: text })
                        }
                        }
                    />
                </View>

                <View style={{ height: 8 }}></View>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <TouchableHighlight
                        style={[styles.button, styles.addButton]}
                        onPress={() => {
                            if (!this.state.type) {
                                this.setState(() => ({ nameError: "Post name required." }));
                            } else {
                                this.setState({ isLoading: true, nameError: null });
                                this.AddNewPost(this.state.type, this.state.brand, this.state.expectedTime, this.state.price);
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
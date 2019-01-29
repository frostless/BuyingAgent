import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Platform, ActivityIndicator, Alert } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import renderIf from '../services/RenderIf'

export default class AddProduct extends Component {
    state = {
        isValidated: false,
        name: null,
        description: null,
        price: null,
        charged: null,
        barCode: null,
        profit: null,
        imgUrl: null,
        categoryId: 1,
        isLoading: false
    }

    AddNewProduct(newProduct) {
        token(this.props.navigation).then((token) => {
            if(!token) return;
            return fetch(`${apiURL}/api/addnew/newProduct`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(newProduct),
            }).then(async (response) => {
                if (response.status == 200) {
                    let responseJson = await response.json();
                    Alert.alert(
                        'BuyingAgent',
                        `${newProduct.name} has been added to the system successfully!`,
                        [
                            {
                                text: 'Confirm', onPress: () => {
                                    newProduct['id'] = responseJson.id,
                                        this.props.AddHandler(newProduct)
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

    IsFormValidated() {
        return this.state.name && this.state.description;
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
                    <Text style={styles.text}>Description:</Text>
                    <TextInput
                        style={styles.multilineInput}
                        multiline={true}
                        numberOfLines={5}
                        value={this.state.description}
                        onChangeText={(text) => {
                            this.setState({ description: text })
                        }
                        }
                    />
                </View>
                {!!this.state.descriptionError && (
                    <Text style={{ color: "red" }}>{this.state.descriptionError}</Text>
                )}
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Category:</Text>
                    <ModalDropdown
                        style={{ width: 100, marginLeft: 8 }}
                        ref="dropdown_productCategory"
                        options={["Formula", "Supplements"]}
                        textStyle={{ borderColor: 'lightgray', borderWidth: 1, borderRadius: 1, }}
                        dropdownTextStyle={styles.dropDown}
                        onSelect={(index, value) => this.setState({ categoryId: Number(index) + 1 })}
                        defaultValue="Formula"
                    >
                    </ModalDropdown>
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Charged:</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='decimal-pad'
                        value={this.state.charged}
                        onChangeText={(text) => {
                            this.setState({ charged: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>BarCode:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.barCode}
                        onChangeText={(text) => {
                            this.setState({ barCode: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Profit:</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='decimal-pad'
                        value={this.state.profit}
                        onChangeText={(text) => {
                            this.setState({ profit: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>ImgUrl:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.imgUrl}
                        onChangeText={(text) => {
                            this.setState({ imgUrl: text })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <TouchableHighlight
                        style={[styles.button, styles.addButton]}
                        onPress={() => {
                            this.setState({ nameError: null, descriptionError: null });
                            if (!this.state.name) {
                                this.setState(() => ({ nameError: "Product name required." }));
                            }
                            if (!this.state.description) {
                                this.setState(() => ({ descriptionError: "Product description required." }));
                            }

                            if (this.IsFormValidated()) {
                                this.setState({ isLoading: true });
                                let NewProduct = {
                                    name: this.state.name,
                                    description: this.state.description,
                                    categoryId: this.state.categoryId
                                };
                                if (this.state.price)
                                    NewProduct['price'] = this.state.price;
                                if (this.state.charged)
                                    NewProduct['charged'] = this.state.charged;
                                if (this.state.price)
                                    NewProduct['barCode'] = this.state.barCode;
                                if (this.state.price)
                                    NewProduct['profit'] = this.state.profit;
                                if (this.state.price)
                                    NewProduct['imgUrl'] = this.state.imgUrl;
                                this.AddNewProduct(NewProduct);
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
        width: 78,
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
    multilineInput: {
        width: 250,
        borderBottomColor: 'gray',
        textAlignVertical: 'top',
        marginLeft: 8,
        borderBottomWidth: 1,
    },
    dropDown: {
        margin: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 1,
    },
})
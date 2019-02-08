import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Platform, ActivityIndicator, Alert } from 'react-native'
import { HeaderBackButton } from "react-navigation";
import renderIf from '../services/RenderIf'

export default class EditShop extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Edit Shop',
            headerLeft: (
                <HeaderBackButton
                    onPress={
                        () => {
                            navigation.goBack();
                            let isShopUpdatedInDB = navigation.getParam('isShopUpdatedInDB');
                            if (isShopUpdatedInDB()) {
                                let goBack = navigation.state.params['goBack'];
                                let constructShopObject = navigation.getParam('constructShopObject');
                                let newShop = constructShopObject();
                                goBack(newShop);
                            }
                        }
                    }
                    title="Back"
                />
            ),
        };
    };

    constructor(props) {
        super(props);
        this.props.navigation.setParams({
            constructShopObject: this.constructShopObject.bind(this),
            isShopUpdatedInDB: this.isShopUpdatedInDB.bind(this)
        });
        this.Init();
    }

    state = {
        isLoading: false,
        isShopUpdatedInDB: false
    }

    isShopUpdatedInDB() {
        return this.state.isShopUpdatedInDB == true;
    }

    IsFormValidated() {
        return this.state.isNameChanged == true || this.state.isAddressChanged == true || this.state.isContactNoChanged == true && this.state.isWeChatNoChanged == true;
    }

    Init() {
        const { navigation } = this.props;
        this.state = {
            name: navigation.getParam('name', ''),
            province: navigation.getParam('address', ''),
            gender: navigation.getParam('contactNo', ''),
            relationship: navigation.getParam('weChatNo', ''),
            shopId: navigation.getParam('id', 0)
        };
    }

    ConstructOpArrForPatch() {
        let patchArr = [];
        if (this.state.isNameChanged)
            patchArr.push({ op: 'replace', path: '/Name', value: this.state.name });
        if (this.state.isAddressChanged)
            patchArr.push({ op: 'replace', path: '/Address', value: this.state.address });
        if (this.state.isContactNoChanged)
            patchArr.push({ op: 'replace', path: '/ContactNo', value: this.state.contactNo });
        if (this.state.isWeChatNoChanged)
            patchArr.push({ op: 'replace', path: '/WeChatNo', value: this.state.weChatNo });
        return patchArr;
    }

    constructShopObject() {
        let shopObject = {};
        shopObject['name'] = this.state.name;
        shopObject['adress'] = this.state.address;
        shopObject['contactNo'] = this.state.contactNo;
        shopObject['weChatNo'] = this.state.weChatNo;
        shopObject['id'] = this.state.shopId;
        return shopObject;
    }

    EditShop(opArr) {
        token(this.props.navigation).then((token) => {
            if(!token) return;
            return fetch(`${apiURL}/api/update/shop/${this.state.shopId}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(opArr),
            }).then(async (response) => {
                if (response.status == 204) {
                    Alert.alert(
                        'BuyingAgent',
                        `${this.state.name} has been edited successfully!`,
                    )
                }
                else {
                    Alert.alert('An error occured, please try again');
                    console.error(response)
                }
                this.setState({ isLoading: false, isShopUpdatedInDB: true });
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
            <View style={styles.view}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.name}
                        onChangeText={(text) => {
                            this.setState({ name: text, isNameChanged: true })
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
                            this.setState({ address: text, isAddressChanged: true })
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
                            this.setState({ contactNo: text, isContactNoChanged: true })
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
                            this.setState({ weChatNo: text, isWeChatNoChanged: true })
                        }
                        }
                    />
                </View>
                {!!this.state.formError && (
                    <Text style={{ color: "red" }}>{this.state.formError}</Text>
                )}
                <View style={{ height: 8 }}></View>
                <TouchableHighlight
                    style={[styles.button, styles.editButton]}
                    onPress={() => {
                        this.setState({ nameError: null, formError: null });
                        if (!this.IsFormValidated())
                            this.setState(() => ({ formError: "You need to change at least one field to edit the shop." }));
                        else if (!this.state.name)
                            this.setState(() => ({ nameError: "Shop name required." }));
                        else {
                            this.setState({ isLoading: true, nameError: null, formError: null });
                            let shopOpArr = this.ConstructOpArrForPatch();
                            this.EditShop(shopOpArr);
                        }
                    }
                    }
                >
                    <Text style={styles.btnText}>OK</Text>
                </TouchableHighlight>
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
    view: {
        padding: 20,
    },
    button: {
        alignSelf: 'flex-end',
        padding: 10,
        marginBottom: 8,
        marginLeft: 8
    },
    text: {
        width: 83,
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
    editButton: {
        backgroundColor: '#2a95e9',
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
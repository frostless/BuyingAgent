import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Platform, ActivityIndicator, Alert } from 'react-native'
import { HeaderBackButton } from "react-navigation";
import renderIf from '../services/RenderIf'

export default class EditPost extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Edit Post',
            headerLeft: (
                <HeaderBackButton
                    onPress={
                        () => {
                            navigation.goBack();
                            let isPostUpdatedInDB = navigation.getParam('isPostUpdatedInDB');
                            if (isPostUpdatedInDB()) {
                                let goBack = navigation.state.params['goBack'];
                                let constructPostObject = navigation.getParam('constructPostObject');
                                let newPost = constructPostObject();
                                goBack(newPost);
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
            constructPostObject: this.constructPostObject.bind(this),
            isPostUpdatedInDB: this.isPostUpdatedInDB.bind(this)
        });
        this.Init();
    }

    state = {
        isLoading: false,
        isPostUpdatedInDB: false
    }

    isPostUpdatedInDB() {
        return this.state.isPostUpdatedInDB == true;
    }

    IsFormValidated() {
        return this.state.isNameChanged == true || this.state.isTypeChanged == true || this.state.isExpectedTimeChanged == true && this.state.isPriceChanged == true;
    }

    Init() {
        const { navigation } = this.props;
        this.state = {
            type: navigation.getParam('type', ''),
            brand: navigation.getParam('brand', ''),
            expectedTime: navigation.getParam('expectedTime', ''),
            price: navigation.getParam('price', ''),
            postId: navigation.getParam('id', 0)
        };
    }

    ConstructOpArrForPatch() {
        let patchArr = [];
        if (this.state.isTypeChanged)
            patchArr.push({ op: 'replace', path: '/Type', value: this.state.type });
        if (this.state.isNameChanged)
            patchArr.push({ op: 'replace', path: '/Brand', value: this.state.brand });
        if (this.state.isExpectedTimeChanged)
            patchArr.push({ op: 'replace', path: '/ExpectedTime', value: this.state.expectedTime });
        if (this.state.isPriceChanged)
            patchArr.push({ op: 'replace', path: '/WeChatNo', value: this.state.price });
        return patchArr;
    }

    constructPostObject() {
        let postObject = {};
        postObject['type'] = this.state.type;
        postObject['brand'] = this.state.brand;
        postObject['expectedTime'] = this.state.expectedTime;
        postObject['price'] = this.state.price;
        postObject['id'] = this.state.postId;
        return postObject;
    }

    EditPost(opArr) {
        token(this.props.navigation).then((token) => {
            if(!token) return;
            return fetch(`${apiURL}/api/update/post/${this.state.postId}`, {
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
                this.setState({ isLoading: false, isPostUpdatedInDB: true });
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
                        value={this.state.brand}
                        onChangeText={(text) => {
                            this.setState({ brand: text, isNameChanged: true })
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
                            this.setState({ brand: text, isTypeChanged: true })
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
                        value={this.state.expectedTime.toString()}
                        onChangeText={(text) => {
                            this.setState({ expectedTime: text, isExpectedTimeChanged: true })
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
                        value={this.state.price.toString()}
                        onChangeText={(text) => {
                            this.setState({ price: text, isPriceChanged: true })
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
                            this.setState(() => ({ formError: "You need to change at least one field to edit the post." }));
                        else if (!this.state.brand)
                            this.setState(() => ({ nameError: "Post name required." }));
                        else {
                            this.setState({ isLoading: true, nameError: null, formError: null });
                            let postOpArr = this.ConstructOpArrForPatch();
                            this.EditPost(postOpArr);
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
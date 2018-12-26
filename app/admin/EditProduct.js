import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Platform, ActivityIndicator, Alert } from 'react-native'
import { HeaderBackButton } from "react-navigation";
import ModalDropdown from 'react-native-modal-dropdown';
import renderIf from '../services/RenderIf'

export default class EditProduct extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Edit Product',
            headerLeft: (
                <HeaderBackButton
                    onPress={
                        () => {
                            navigation.goBack();
                            let isProductUpdatedInDB = navigation.getParam('isProductUpdatedInDB');
                            if (isProductUpdatedInDB()) {
                                let goBack = navigation.state.params['goBack'];
                                let ConstructProductObject = navigation.getParam('ConstructProductObject');
                                let newProduct = ConstructProductObject();
                                goBack(newProduct);
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
            ConstructProductObject: this.ConstructProductObject.bind(this),
            isProductUpdatedInDB: this.isProductUpdatedInDB.bind(this)
        });
        this.Init();
    }

    state = {
        isLoading: false,
        isProductUpdatedInDB: false
    }

    isProductUpdatedInDB() {
        return this.state.isProductUpdatedInDB == true;
    }

    IsFormValidated() {
        return this.state.name && this.state.description;
    }

    IsFormChanged() {
        return this.state.isNameChanged == true || this.state.isDescriptionChanged == true ||
            this.state.isPriceChanged == true || this.state.isChargedChanged == true ||
            this.state.isBarCodeChanged == true || this.state.isProfitChanged == true ||
            this.state.isImgUrlChanged == true || this.state.isCategoryIdChanged == true;
    }

    Init() {
        const { navigation } = this.props;
        this.state = {
            name: navigation.getParam('name', ''),
            description: navigation.getParam('description', ''),
            price: navigation.getParam('price', 0),
            charged: navigation.getParam('charged', 0),
            barCode: navigation.getParam('barCode', ''),
            profit: navigation.getParam('profit', 0),
            imgUrl: navigation.getParam('imgUrl', ''),
            categoryId: navigation.getParam('categoryId', 1),
            productId: navigation.getParam('id', 0)
        };
    }

    ConstructOpArrForPatch() {
        let patchArr = [];
        if (this.state.isNameChanged)
            patchArr.push({ op: 'replace', path: '/Name', value: this.state.name });
        if (this.state.isDescriptionChanged)
            patchArr.push({ op: 'replace', path: '/Description', value: this.state.description });
        if (this.state.isPriceChanged)
            patchArr.push({ op: 'replace', path: '/Price', value: this.state.price });
        if (this.state.isChargedChanged)
            patchArr.push({ op: 'replace', path: '/Charged', value: this.state.charged });
        if (this.state.isBarCodeChanged)
            patchArr.push({ op: 'replace', path: '/BarCode', value: this.state.barCode });
        if (this.state.isProfitChanged)
            patchArr.push({ op: 'replace', path: '/Profit', value: this.state.profit });
        if (this.state.isImgUrlChanged)
            patchArr.push({ op: 'replace', path: '/imgUrl', value: this.state.imgUrl });
        if (this.state.isCategoryIdChanged)
            patchArr.push({ op: 'replace', path: '/CategoryId', value: this.state.categoryId });
        return patchArr;
    }

    ConstructProductObject() {
        let productObject = {};
        productObject['name'] = this.state.name;
        productObject['description'] = this.state.description;
        productObject['price'] = this.state.price;
        productObject['charged'] = this.state.charged;
        productObject['profit'] = this.state.profit;
        productObject['barCode'] = this.state.barcode;
        productObject['imgUrl'] = this.state.imgUrl;
        productObject['id'] = this.state.productId;
        productObject['categoryId'] = this.state.categoryId;
        return productObject;
    }

    EditProduct(opArr) {
        return fetch(`${apiURL}/api/update/product/${this.state.productId}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
            this.setState({ isLoading: false, isProductUpdatedInDB: true });
        })
            .catch((error) => {
                Alert.alert(error)
                console.error(error);
                this.setState({ isLoading: false });
            });
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
                    <Text style={styles.text}>Description:</Text>
                    <TextInput
                        style={styles.multilineInput}
                        multiline={true}
                        numberOfLines={5}
                        value={this.state.description}
                        onChangeText={(text) => {
                            this.setState({ description: text, isDescriptionChanged: true })
                        }
                        }
                    />
                </View>
                {!!this.state.descriptionError && (
                    <Text style={{ color: "red" }}>{this.state.descriptionError}</Text>
                )}
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Price:</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='decimal-pad'
                        value={this.state.price.toString()}
                        onChangeText={(text) => {
                            this.setState({ price: Number(text), isPriceChanged: true })
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
                        value={this.state.charged.toString()}
                        onChangeText={(text) => {
                            this.setState({ charged: Number(text), isChargedChanged: true })
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
                            this.setState({ barCode: text, isBarCodeChanged: true })
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
                        value={this.state.profit.toString()}
                        onChangeText={(text) => {
                            this.setState({ profit: Number(text), isProfitChanged: true })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>ImgUrl:</Text>
                    <TextInput
                        style={styles.multilineInput}
                        multiline={true}
                        numberOfLines={3}
                        value={this.state.imgUrl}
                        onChangeText={(text) => {
                            this.setState({ imgUrl: text, isImgUrlChanged: true })
                        }
                        }
                    />
                </View>
                <View style={{ height: 8 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Category:</Text>
                    <ModalDropdown
                        style={{ width: 100, marginLeft: 8 }}
                        ref="dropdown_productCategory"
                        options={["Formula", "Supplements"]}
                        textStyle={{ borderColor: 'lightgray', borderWidth: 1, borderRadius: 1, }}
                        dropdownTextStyle={styles.dropDown}
                        onSelect={(index, value) => this.setState({ categoryId: Number(index) + 1, isCategoryIdChanged: true })}
                        defaultValue={this.state.categoryId == 1 ? "Formula" : "Supplements"}
                    >
                    </ModalDropdown>
                </View>
                {!!this.state.formError && (
                    <Text style={{ color: "red"}}>{this.state.formError}</Text>
                )}
                <View style={{ height: 8 }}></View>
                <TouchableHighlight
                    style={[styles.button, styles.editButton]}
                    onPress={() => {
                        this.setState({ nameError: null, descriptionError: null, formError: null });
                        if (!this.IsFormChanged()) {
                            this.setState(() => ({ formError: "You need to change at least one field to edit the customer." }));
                            return;
                        }

                        if (!this.state.name)
                            this.setState(() => ({ nameError: "Product name required." }));

                        if (!this.state.description) {
                            this.setState(() => ({ descriptionError: "Product description required." }));
                        }

                        if (this.IsFormValidated()) {
                            this.setState({ isLoading: true, nameError: null, descriptionError: null, formError: null });
                            let productOpArr = this.ConstructOpArrForPatch();
                            this.EditProduct(productOpArr);
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
        width: 78,
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
    multilineInput: {
        width: 250,
        borderBottomColor: 'gray',
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
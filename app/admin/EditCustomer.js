import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Platform, ActivityIndicator, Alert } from 'react-native'
import { HeaderBackButton } from "react-navigation";
import DatePicker from 'react-native-datepicker'
import renderIf from '../services/RenderIf'

export default class EditCustomer extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Edit Customer',
            headerLeft: (
                <HeaderBackButton
                    onPress={
                        () => {
                            navigation.goBack();
                            let isCustomerUpdatedInDB = navigation.getParam('isCustomerUpdatedInDB');
                            if (isCustomerUpdatedInDB()) {
                                let goBack = navigation.state.params['goBack'];
                                let constructCustomerObject = navigation.getParam('ConstructCustomerObject');
                                let newCustomer = constructCustomerObject();
                                goBack(newCustomer);
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
            ConstructCustomerObject: this.ConstructCustomerObject.bind(this),
            isCustomerUpdatedInDB: this.isCustomerUpdatedInDB.bind(this)
        });
        this.Init();
    }

    state = {
        isLoading: false,
        isCustomerUpdatedInDB: false
    }

    isCustomerUpdatedInDB() {
        return this.state.isCustomerUpdatedInDB == true;
    }

    IsFormValidated() {
        return this.state.isNameChanged == true || this.state.isProvinceChanged == true || this.state.isCustomerSinceChanged == true && this.state.isGenderChanged == true || this.state.isCustomerSinceChanged == true

    }

    Init() {
        const { navigation } = this.props;
        this.state = {
            name: navigation.getParam('name', ''),
            province: navigation.getParam('province', ''),
            gender: navigation.getParam('gender', ''),
            relationship: navigation.getParam('relationship', ''),
            customerSince: navigation.getParam('customerSince', ''),
            customerId: navigation.getParam('id', 0)
        };
    }

    ConstructOpArrForPatch() {
        let patchArr = [];
        if (this.state.isNameChanged)
            patchArr.push({ op: 'replace', path: '/Name', value: this.state.name });
        if (this.state.isGenderChanged)
            patchArr.push({ op: 'replace', path: '/Gender', value: this.state.gender });
        if (this.state.isProvinceChanged)
            patchArr.push({ op: 'replace', path: '/Province', value: this.state.province });
        if (this.state.isRelatipnshioChanged)
            patchArr.push({ op: 'replace', path: '/Relationship', value: this.state.relationship });
        if (this.state.isCustomerSinceChanged)
            patchArr.push({ op: 'replace', path: '/CustomerSince', value: this.state.customerSince });
        return patchArr;
    }

    ConstructCustomerObject() {
        let customerObject = {};
        customerObject['name'] = this.state.name;
        customerObject['province'] = this.state.province;
        customerObject['gender'] = this.state.gender;
        customerObject['relationship'] = this.state.relationship;
        customerObject['customerSince'] = this.state.customerSince;
        customerObject['id'] = this.state.customerId;
        return customerObject;
    }

    EditCustomer(opArr) {
        token(this.props.navigation).then((token) => {
            if(!token) return;
            return fetch(`${apiURL}/api/update/customer/${this.state.customerId}`, {
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
                this.setState({ isLoading: false, isCustomerUpdatedInDB: true });
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
                    <Text style={styles.text}>Province:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.province}
                        onChangeText={(text) => {
                            this.setState({ province: text, isProvinceChanged: true })
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
                            this.setState({ gender: text, isGenderChanged: true })
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
                            this.setState({ relationship: text, isRelationshipChanged: true })
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
                        onDateChange={(date) => { this.setState({ customerSince: date, isCustomerSinceChanged: true }); }}
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
                            this.setState(() => ({ formError: "You need to change at least one field to edit the customer." }));
                        else if (!this.state.name)
                            this.setState(() => ({ nameError: "Customer name required." }));
                        else {
                            this.setState({ isLoading: true, nameError: null, formError: null });
                            let customerOpArr = this.ConstructOpArrForPatch();
                            this.EditCustomer(customerOpArr);
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
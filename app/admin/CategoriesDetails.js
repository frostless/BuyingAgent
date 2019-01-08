import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAllCategoriesAsyn } from '../services/FetchManage'
import renderIf from '../services/RenderIf'

export default class CategoriesDetailsView extends Component {
    static navigationOptions = {
        title: 'Categories Details',
    };

    componentDidMount() {
        this.mounted = true;
        getAllCategoriesAsyn.call(this);
    }

    componentWillUnmount() {
        this.mounted = false; //anti pattern https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount
    }

    state = {
        isLoading: true,
        categories: []
    };

    renderRow(item, index) {
        return (
            <View key={item.id} style={{ flex: 0, height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1 }}>
                <Text style={{ flex: 1 }}>{item.name}</Text>
            </View>
        );
    }

    render() {
        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.view}
            >
                <View style={{ paddingLeft: 20, paddingRight: 20, minHeight: Dimensions.get('window').height }}>
                    <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        {
                            this.state.categories.map((item, index) => {
                                return this.renderRow(item, index);
                            })
                        }
                    </View>
                </View>
                {renderIf(this.state.isLoading)(
                    <View pointEvents='none' style={styles.indicator}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
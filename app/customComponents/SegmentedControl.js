import React, { Component } from 'react';
import { Platform } from 'react-native';
import { SegmentedControlIOS } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'


export default class SegmentedControl extends Component {
    render() {
        if (Platform.OS == 'ios') {
            return (
                <SegmentedControlIOS
                    style={this.props.customStyle}
                    values={['Baby Formula', 'Supplements']}
                    selectedIndex={this.props.productCatIndex}
                    onChange={(event) => {
                        this.props.callbackiOS(event);
                    }}
                />
            );
        } else if (Platform.OS == 'android') {
            return (
                <SegmentedControlTab
                    tabStyle={{ marginBottom: 8 }}
                    values={['Baby Formula', 'Supplements']}
                    selectedIndex={this.props.productCatIndex}
                    onTabPress={(index) => {
                        this.props.callbackAndroid(index);
                    }}
                />
            );
        }
    }
}
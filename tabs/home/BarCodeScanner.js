import React, {Component} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Camera from 'react-native-camera';

export default class BarCodeScanner extends Component {
    static navigationOptions = {
     header:null
   };

    constructor(props) {
        super(props);
        this.state = {
            barCode: ''
        }
    }

    onBarCodeRead = (e) => {
        this.setState({barCode: e.data});
        this.props.navigation.goBack();
    }

    render () {
        // const {goBack} = this.props.navigation;
        return (
            <View  style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}
                    >
                        <Text style={{
                            backgroundColor: 'white'
                        }}>{this.state.barCode}</Text>
                    </Camera>
                    <Button
          onPress={() => {
            this.props.navigation.state.params.BarCoderReturn(this.state.barCode);
            this.props.navigation.goBack();
          }
        }
          title="Go back"
        />
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

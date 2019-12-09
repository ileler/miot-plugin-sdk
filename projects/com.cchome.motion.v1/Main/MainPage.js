'use strict';

import React from 'react';
import {Dimensions, Image, ListView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Device, Entrance, Package} from "miot";
import {Images} from 'miot/resources';
import NavigationBar from "miot/ui/NavigationBar";
import Card from 'miot/ui/Card';

import {getString} from './MHLocalizableString';


const {width, height} = Dimensions.get('window');
const CARD_PADDING = 50;
const CARD_HEIGHT = 125;
const ICON_SIZE = 80;
const SICON_SIZE = 40;
const DEFAULT_MARGIN = 10;


export default class MainPage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header:
                <View>
                    <NavigationBar
                        backgroundColor='transparent'
                        type={NavigationBar.TYPE.LIGHT}
                        left={[
                            {
                                key: NavigationBar.ICON.BACK,
                                onPress: _ => Package.exit()
                            }
                        ]}
                        right={[
                            {
                                key: NavigationBar.ICON.MORE,
                                onPress: _ => navigation.navigate('Setting', {'title': '设置'})
                            }
                        ]}
                        title={navigation.state["params"] ? navigation.state.params.name : Device.name}
                    />
                </View>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillUnmount() {

    }

    componentWillMount() {
        // const licenseURL = require('../Resources/raw/license_zh.html');
        // const policyURL = require('../Resources/raw/privacy_zh.html');
        // let options = {
        //   hideAgreement: false,
        //   hideUserExperiencePlan: true,
        //   agreementURL: licenseURL,
        //   privacyURL: policyURL
        // }
        // Host.ui.alertLegalInformationAuthorization(options).then((res) => {
        // }).catch((error) => {
        //   console.log(error)
        // })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{width}</Text>
                <Text>{height}</Text>
                <Text>{Device.model}</Text>
            </View>
        );
    }

    componentDidMount() {
        console.log("MainPage  componentDidMount...")
        if (Package.pageParams.isBackToMainPage && Package.entrance !== Entrance.Main) {
            this.props.navigation.navigate(Package.entrance)
        }
    }

}


var styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderTopColor: '#f1f1f1',
        borderTopWidth: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ffffff',
        marginBottom: 0,
        marginTop: 0,
    },
    list: {
        flex: 0,
        // height: 400,
        // alignSelf: 'stretch',
        borderWidth: 1
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: DEFAULT_MARGIN
    },
    innerIcon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginRight: DEFAULT_MARGIN
    },
    innerSIcon: {
        width: SICON_SIZE,
        height: SICON_SIZE
    },
    innerTitle: {
        width: 100,
        textAlign: 'center',
        fontSize: 16,
        color: '#000'
    },
    innerSubTitle: {
        fontSize: 14,
        color: '#333'
    }
});

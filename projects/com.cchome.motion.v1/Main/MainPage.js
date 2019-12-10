'use strict';

import React from 'react';
import {Dimensions, Image, ListView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Device, Entrance, Package} from "miot";
import {Images} from 'miot/resources';
import NavigationBar from "miot/ui/NavigationBar";
import Card from 'miot/ui/Card';

import {getString} from './MHLocalizableString';
import TimeCell from './TimeCell';


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
                <TimeCell/>
                <View style={styles.cardContainer}>
                    <Text>XXXXX</Text>
                </View>
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginBottom: 0,
        marginTop: 0,
    },
    timeContainer: {
        flex: 3,
        flexDirection: 'column',
        width: '90%',
        borderWidth: 1,
        padding: '5%'
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    timeRow: {
        flex: 1,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 0,
        padding: 0
    },
    timeView: {
        flexDirection: 'column',
        borderWidth: 1,
        flex: 1
    },
    timeText: {
        borderWidth: 1,
        flex: 1
    },
    timeImage: {
        borderWidth: 1,
        flex: 3
    }
});

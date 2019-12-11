'use strict';

import React from 'react';
import {Dimensions, Image, ListView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Device, Entrance, Package, Host} from "miot";
import {Images} from 'miot/resources';
import NavigationBar from "miot/ui/NavigationBar";
import MHCard from "miot/ui/Card/MHCard";

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
                        backgroundColor='#a0c0c0'
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
                <View style={styles.timeContainer}>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 50, marginBottom: 10}}>今天动态</Text>
                    <View style={styles.timeSubContainer}>
                        <TimeCell/>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <MHCard
                        title='智能场景'
                        titleStyle={{ fontSize: 18 }}
                        cardType={MHCard.CARD_TYPE.NORMAL}
                        cardRadiusType={MHCard.CARD_RADIUS_TYPE.ALL}
                        onPress={_ => Host.ui.openIftttAutoPage()}
                    />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a0c0c0',
        marginBottom: 0,
        marginTop: 0,
    },
    timeContainer: {
        flex: 3,
        width: '60%',
        alignItems: 'center',
    },
    timeSubContainer: {
        height: '80%',
        width: '100%',
    },
    cardContainer: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingBottom: 15
    }
});

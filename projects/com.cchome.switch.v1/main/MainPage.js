'use strict';

import React from 'react';
import {Dimensions, Image, ListView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Device, Entrance, Package} from "miot";
import {Images} from 'miot/resources';
import TitleBar from "miot/ui/TitleBar";
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
                    <TitleBar
                        type='dark'
                        title={navigation.state["params"] ? navigation.state.params.name : Device.name}
                        subTitle={getString('NUM_PHOTOS', {'numPhotos': 1})}
                        onPressLeft={() => {
                            Package.exit()
                        }}
                        onPressRight={() => {
                            navigation.navigate('Setting', {'title': '设置'});
                        }}/>
                </View>
        };
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this._createCardData();
        this.state = {
            dataSource: ds.cloneWithRows(this._cardData.map((o) => (o.name))),
        };
        var count = this.state.dataSource.getRowCount();
        this.state.cardContainerHeight = (CARD_HEIGHT * count) + (CARD_PADDING + ((count - 1) * (20 - count)))
    }

    _createCardData() {
        this._cardData = [
            {
                'name': '测试开关1',
                'switch': () => {
                    console.log("开/关")
                }
            }, {
                'name': '测试开关2',
                'switch': () => {
                    console.log("开/关")
                }
            }
        ];
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        borderWidth: 1,
                        padding: 0,
                        height: height - this.state.cardContainerHeight
                    }}
                >
                    <View style={{
                        padding: 10
                    }}>
                        <Text>{width}</Text>
                        <Text>{height}</Text>
                        <Text>{this.state.dataSource.getRowCount()}</Text>
                        <Text>{Device.model}</Text>
                        <Text>test1</Text>
                        <Text>test2</Text>
                        <Text>test3</Text>
                        <Text>test4</Text>
                        <Text>test5</Text>
                        <Text>test6</Text>
                        <Text>test7</Text>
                        <Text>test8</Text>
                        <Text>test9</Text>
                        <Text>test10</Text>
                        <Text>test11</Text>
                        <Text>test12</Text>
                        <Text>test13</Text>
                        <Text>test14</Text>
                        <Text>test15</Text>
                        <Text>test16</Text>
                        <Text>test17</Text>
                        <Text>test18</Text>
                        <Text>test19</Text>
                        <Text>test20</Text>
                        <Text>test21</Text>
                        <Text>test22</Text>
                        <Text>test23</Text>
                        <Text>test24</Text>
                        <Text>test25</Text>
                        <Text>test26</Text>
                        <Text>test27</Text>
                        <Text>test28</Text>
                        <Text>test29</Text>
                        <Text>test30</Text>
                    </View>
                </ScrollView>
                <ListView style={{height: this.state.cardContainerHeight}} contentContainerStyle={{flex: 1}}
                          dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
            </View>
        );
    }

    componentDidMount() {
        console.log("MainPage  componentDidMount...")
        if (Package.pageParams.isBackToMainPage && Package.entrance !== Entrance.Main) {
            this.props.navigation.navigate(Package.entrance)
        }
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={{borderWidth: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Card
                    innerView={this._getInnerView({name: rowData})}
                    showShadow={false}
                    disabled={true}
                    onPress={_ => console.log("value")}
                    cardStyle={{height: CARD_HEIGHT, borderWidth: 1, borderRadius: 16}}
                />
            </View>
        );
    }

    _getInnerView(data) {
        return (
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => console.log("value")}>
                    <Image
                        style={styles.innerIcon}
                        source={Images.common.mihome}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={{borderWidth: 1, flex: 1, alignItems: 'center'}}>
                    <View style={{borderWidth: 1, flex: 0, alignItems: 'center'}}>
                        <Text
                            style={styles.innerTitle}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {data.name}
                        </Text>
                    </View>
                    <View style={{borderWidth: 1, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{borderWidth: 1, flex: 1, alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => console.log("value")}>
                                <Image
                                    style={styles.innerSIcon}
                                    source={Images.common.mihome}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <Text
                                style={styles.innerSubTitle}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                定时
                            </Text>
                        </View>
                        <View style={{borderWidth: 1, flex: 1, alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => console.log("value")}>
                                <Image
                                    style={styles.innerSIcon}
                                    source={Images.common.mihome}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <Text
                                style={styles.innerSubTitle}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                倒计时
                            </Text>
                        </View>
                        <View style={{borderWidth: 1, flex: 1, alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => console.log("value")}>
                                <Image
                                    style={styles.innerSIcon}
                                    source={Images.common.mihome}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <Text
                                style={styles.innerSubTitle}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                开关
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
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

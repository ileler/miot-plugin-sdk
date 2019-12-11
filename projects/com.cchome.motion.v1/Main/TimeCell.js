'use strict';

import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';

import {Device, Entrance, Package} from "miot";
import {Images} from 'miot/resources';

const ICON_SIZE = Platform.select({ android: 26, ios: 24 }); // 当android设置24的时候，图形会挤压形成锯齿


export default class TimeCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillUnmount() {
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        let rows = [];
        for (let i = 0, j = 6; i < j; i++) {
            rows.push(this.renderTimeRow(i * 4));
        }
        return (
            <View style={styles.timeContainer}>
                {rows}
            </View>
        );
    }

    renderTimeRow(count) {
        let views = [];
        for (let i = 0, j = 4; i < j; i++) {
            views.push(this.renderTimeView(count + i));
        }
        return (
            <View style={styles.timeRow}>
                {views}
            </View>
        );
    }

    renderTimeView(count) {
        const border = { borderTopWidth: 1, borderLeftWidth: 1 };
        if ((count + 1) % 4 == 0) border.borderRightWidth = 1;
        if (count >= 20) border.borderBottomWidth = 1;
        return (
            <View style={[styles.timeView, border]}>
                <View style={styles.timeText}>
                    <Text style={{flex: 1, textAlign: 'center', backgroundColor: '#808080'}}>{count}</Text>
                </View>
                <View style={styles.timeImage}>
                    {count==4
                        ? <Image
                            style={styles.icon}
                            source={Images.common.mihome}
                        />
                        : null
                    }
                </View>
            </View>
        );
    }

}


var styles = StyleSheet.create({
    timeContainer: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    timeRow: {
        flex: 1,
        flexDirection: 'row',
    },
    timeView: {
        flex: 1
    },
    timeText: {
        borderBottomWidth: 1,
        flex: 1
    },
    timeImage: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: '60%',
        height: '60%',
    }
});

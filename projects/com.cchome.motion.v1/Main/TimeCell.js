'use strict';

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Device, Entrance, Package} from "miot";
import {Images} from 'miot/resources';


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
        return (
            <View style={styles.timeView}>
                <View style={styles.timeText}>
                    <Text>{count}</Text>
                </View>
                <View style={styles.timeImage}>
                    <Image/>
                </View>
            </View>
        );
    }

}


var styles = StyleSheet.create({
    timeContainer: {
        flex: 3,
        flexDirection: 'column',
        width: '90%',
        borderWidth: 1,
        padding: '5%'
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

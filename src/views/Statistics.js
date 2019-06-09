/*
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Echarts from 'native-echarts';

export default class StatisticsView extends React.Component {
    render() {
        const option = {
            title: {
                text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        return (
            <Echarts option={option} height={300} />
        );
        /*
        return (
            <View style={styles.mainContent}>
                <Text>Statistics</Text>
            </View>
        );
        */
    }
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 80,
    },
});

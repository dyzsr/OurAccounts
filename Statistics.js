import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Statistics extends React.Component {
    render(props) {
        return (
            <View style={styles.mainContent}>
                <Text>Statistics</Text>
            </View>
        );
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

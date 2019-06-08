import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

function AccountsView(props) {
    return (
        <View style={styles.mainContent}>
            <Text>Accounts!!!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 80,
    },
});

function mapStateToProps({count}) {
    return {count};
}

export default connect(mapStateToProps)(AccountsView);
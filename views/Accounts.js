import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';

import { mapStateToProps, mapDispatchToProps } from '../models/Accounts';
import AccountEditView from './AccountEdit';

const AccountItem = ({account, index, onClickDel}) => {
    return (
        <View>
            <Text>Account key={account.key} index={index}</Text>
            <Icon.Button
                name="trash-alt"
                onPress={() => onClickDel(index)}
            >Del
            </Icon.Button>
        </View>
    );
}

const AccountList = ({accounts, onClickDel}) => {
    // console.log(accounts);
    return (
        <FlatList
            data={accounts}
            renderItem={({ item, index }) => (
                <AccountItem account={item} index={index} onClickDel={onClickDel} />
            )}
        />
    );
}

const Accounts = ({ accounts, onClickAdd, onClickDel }) => {
    // console.log(accounts);
    return (
        <View style={styles.mainContent}>
            <Icon.Button
                name="plus"
                background="#3b5998"
                onPress={onClickAdd}
            >Add
            </Icon.Button>
            <Text>Accounts!!!</Text>
            <AccountList accounts={accounts} onClickDel={onClickDel}/>
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

const AccountsView_ = connect(mapStateToProps, mapDispatchToProps)(Accounts);
const AccountsView = createStackNavigator({
    list: {screen: AccountsView_},
    edit: {screen: AccountEditView},
}, {
    initialRouteKey: 'list',
});

export default AccountsView;
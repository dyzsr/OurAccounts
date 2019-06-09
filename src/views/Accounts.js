import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';

import AccountEditView from './AccountEdit';

const AccountItem = ({account, index, onClickDel, onClickEdit}) => {
    return (
        <View>
            <Text>Account key={account.key} index={index}</Text>
            <Icon.Button
                name="trash-alt"
                onPress={() => onClickDel(index)}
            >Del
            </Icon.Button>
            <Icon.Button
                name="trash-alt"
                onPress={() => onClickEdit(index)}
            >Edit
            </Icon.Button>
        </View>
    );
}

const AccountList = ({accounts, onClickDel, onClickEdit}) => {
    // console.log(accounts);
    return (
        <FlatList
            data={accounts}
            renderItem={({ item, index }) => (
                <AccountItem
                    account={item}
                    index={index}
                    onClickDel={onClickDel}
                    onClickEdit={onClickEdit}
                />
            )}
        />
    );
}


const Accounts = ({ accounts, navigation, onClickAdd, onClickDel, onClickEdit }) => {
	return (
		<View style={styles.mainContent}>
			<Icon.Button
				name="plus"
				background="#3b5998"
				onPress={onClickAdd}
			>Add
      </Icon.Button>
			<Text>Accounts!!!</Text>
			<AccountList
				accounts={accounts}
				onClickDel={onClickDel}
				onClickEdit={(idx) => onClickEdit(idx, () => {
					navigation.navigate('accountEdit');
				})}
			/>
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

const mapStateToProps = ({accountInfo}) => ({accounts: accountInfo.accounts});

const mapDispatchToProps = (dispatch) => ({
    onClickAdd: () => dispatch({type: 'account_add'}),
    onClickDel: (idx) => dispatch({type: 'account_del', index: idx}),
    onClickEdit: (idx, callBack) => {
        dispatch({type: 'account_select', index: idx});
        dispatch({type: 'account_edit', callBack: callBack})
    },
});

const AccountsView_ = connect(mapStateToProps, mapDispatchToProps)(Accounts);
const AccountsView = createStackNavigator({
    accountList: {screen: AccountsView_},
    accountEdit: {screen: AccountEditView},
}, {
    initialRouteKey: 'accountList',
});

export default AccountsView;
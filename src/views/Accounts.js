import React from 'react';
import { connect } from 'react-redux';

import { Text, View } from 'react-native';
import { Button, withTheme } from 'react-native-paper';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';

import AccountEditView from './AccountEdit';
import styles from './style';

var moment = require('moment');

const AccountItem = ({ account, index, onClickDel, onClickEdit }) => {
	let swipeoutBtn = [{
		text: 'delete',
		type: 'delele',
		onPress: () => onClickDel(index),
	}];
	return (
		<Swipeout right={swipeoutBtn}>
			<TouchableHighlight onPress={() => onClickEdit(index)}>
				<View>
					<Text>Account {index}</Text>
					<Text style={styles.text}>
						{account.item ? account.item : 'unknown'}
						{' ' + moment(account.date).format('YYYY-MM-DD')}
					</Text>
				</View>
			</TouchableHighlight>
		</Swipeout>
	);
}

const AccountList = ({ accounts, onClickDel, onClickEdit }) => {
	// console.log(accounts);
	return (
		<FlatList
			data={accounts}
			renderItem={({item, index}) => (
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


class Accounts extends React.Component {
	static navigationOptions({navigation}) {
		return {
			title: 'Accounts',
			headerRight: (
				<Button icon="add-circle" onPress={navigation.getParam('onClickAdd')}>
					Add
				</Button>
			)
		};
	}

	componentDidMount() {
		const { navigation, onClickAdd } = this.props;
		navigation.setParams({
			onClickAdd: () => onClickAdd(),
		});
	}

	render() {
		const {accounts, navigation, onClickAdd, onClickDel, onClickEdit} = this.props;
		return (
			<View>
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
}

const mapStateToProps = ({ accountInfo }) => ({ accounts: accountInfo.accounts });

const mapDispatchToProps = (dispatch) => ({
	onClickAdd: () => dispatch({ type: 'account_add' }),
	onClickDel: (idx) => dispatch({ type: 'account_del', index: idx }),
	onClickEdit: (idx, callBack) => {
		dispatch({ type: 'account_select', index: idx });
		dispatch({ type: 'account_edit', callBack: callBack })
		console.log('EDIT');
	},
});

const AccountsView_ = connect(mapStateToProps, mapDispatchToProps)(Accounts);
let AccountsView = createStackNavigator({
	accountList: {
		screen: AccountsView_,
		// navigationOptions: () => ({title: "Accounts",})
	},

	accountEdit: {
		screen: AccountEditView,
		// navigationOptions: () => ({ title: "Edit Account" }),
	},
}, {
		initialRouteKey: 'accountList',
	}
);

AccountsView = withTheme(AccountsView);
export default AccountsView;
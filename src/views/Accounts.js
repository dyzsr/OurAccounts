import React from 'react';
import { connect } from 'react-redux';

import {
	Container, Header, Content, Button, Text, Title,
	ListItem, SwipeRow, Icon, Item, Left, Body, Right,
} from 'native-base';
import { FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import AccountEditView from './AccountEdit';
import styles from './style';

var moment = require('moment');

const AccountItem = ({ account, index, onClickDel, onClickEdit }) => {
	return (
		<SwipeRow
			disableRightSwipe={true}
			leftOpenValue={75}
			rightOpenValue={-75}
			body={
				<Button full light
					style={{alignContent: 'flex-start', width: '100%', height: '100%'}}
					onPress={() => onClickEdit(index)}>
					<Text style={{flex: 1, fontSize: 25}}>
					条目{index}:
					</Text>
					<Text style={{flex: 3, flexDirection: 'column'}}>
						<Text>
							{account.isIncome ? '收入' : '支出'}
							{"\n"}
							消费类别: {account.item ? account.item : '未设置'}
							{"\n"}
							消费时间: {moment(account.date).format('YYYY-MM-DD')}
						</Text>
					</Text>
				</Button>
			}
			right={
				<Button full danger
					onPress={() => onClickDel(index)}>
					<Icon active name='trash' />
				</Button>
			}
		/>
	);
}

const AccountList = ({ accounts, onClickDel, onClickEdit, style }) => {
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
			header: (
				<Header>
					<Left />
					<Body>
						<Title>账单</Title>
					</Body>
					<Right />
				</Header>
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
			<Container>
				<Content padder>
					<Button block success
						onPress={navigation.getParam('onClickAdd')}>
						<Icon type="MaterialIcons" name="add-circle"/>
						<Text>添加</Text>
					</Button>
					<AccountList
						accounts={accounts}
						onClickDel={onClickDel}
						onClickEdit={(idx) => onClickEdit(idx, () => {
							navigation.navigate('accountEdit');
						})}
					/>
				</Content>
			</Container>
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
const AccountsView = createStackNavigator({
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

export default AccountsView;
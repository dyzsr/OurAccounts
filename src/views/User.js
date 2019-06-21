import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  View,
	TextInput,
	Alert,
} from 'react-native'
import {
	Container, Header, Content, Button, Title,
	ListItem, SwipeRow, Item, Left, Body, Right,
} from 'native-base'
import { createStackNavigator, HeaderBackButton } from 'react-navigation'

class UserSync extends React.Component {
	static navigationOptions({navigation}) {
		return {
			title: 'UserSync',
			header: (
				<Header>
					<Left />
					<Body>
						<Title>欢迎回来，{navigation.getParam('name')}!</Title>
					</Body>
					<Right />
				</Header>
			)
		}
	}

	constructor(props) {
		console.log('USERSYNC')
		super(props)
	}

	componentWillMount() {
		const { navigation, name } = this.props;
		console.log(name);
    navigation.setParams({
      name: name
    });
  }

	render() {
		const {accounts, navigation,
			syncUp, syncDown, userExit} = this.props
		return (
			<Container>
				<ScrollView
					contentContainerStyle={{flex: 1}}
					keyboardDismissMode="on-drag"
					keyboardShouldPersistTaps="false"
					scrollEnabled={false}
				>
					<View
						style = {styles.container}
					>
						{/* 上传按钮 */}
						<View style={styles.buttonView}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => syncUp(accounts)}	// 上传功能
							>
								<Text style={styles.buttonText}>
									上传
								</Text>
							</TouchableOpacity>
						</View>

						{/* 下载按钮 */}
						<View style={styles.buttonView}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => syncDown()}	// 下载功能
							>
								<Text style={styles.buttonText}>
									下载
								</Text>
							</TouchableOpacity>
						</View>

						{/* 退出按钮 */}
						<View style={styles.buttonView}>
							<TouchableOpacity
								style={[styles.button, {backgroundColor: "red"}]}
								onPress={() => userExit(() => navigation.navigate('signIn'))}	// 退出功能
							>
								<Text style={styles.buttonText}>
									退出
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	flex: {
		flex: 2
	},
	buttonView: {
		flex: 3
	},
	title: {
		textAlign: 'center',
		color: 'white',
		fontSize: 25,
		marginTop: 80,
		fontWeight: 'bold'
	},
	inputView: {
		padding: 5,
		backgroundColor: '#fff'
	},
	lineBottom: {
		borderBottomWidth: 5 / PixelRatio.get(),
		borderColor: 'rgb(208,208,208)'
	},
	button: {
		marginTop: 30,
		marginLeft: 10,
		marginRight: 10,
		height: 44,
		borderRadius: 2,
		backgroundColor: 'green',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	buttonText: {
		fontSize: 22,
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold'
	},
	text: {
		flex: 1,
		lineHeight: 44,
		fontSize: 18,
		justifyContent: 'center',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	view: {
		flexDirection: 'row',
		height: 44
	},
	textInputStyle: {
		flex: 5,
		marginRight: 10,
		fontSize: 18,
		marginTop: 4
	},
	lineTopBottom: {
		borderBottomWidth: 3 / PixelRatio.get(),
		borderColor: 'rgb(208,208,208)'
	},
	centering: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const mapStateToProps = ({ accountInfo, syncInfo }) => ({
	accounts: accountInfo.accounts,
	name: syncInfo.name,
})

const mapDispatchToProps = (dispatch) => ({
	syncUp: (accounts) => dispatch({type: 'sync_up', accounts: accounts}),
	syncDown: () => dispatch({type: 'sync_down'}),
	userExit: (callBack) => dispatch({type: 'user_exit', callBack}),
})

const UserSyncView = connect(mapStateToProps, mapDispatchToProps)(UserSync)

export default UserSyncView
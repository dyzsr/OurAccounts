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
import SignUpView from './Signup'
import UserSyncView from './User'

class SignIn extends React.Component {
	static navigationOptions({navigation}) {
		return {
			title: 'SignIn',
			header: (
				<Header>
					<Left />
					<Body>
						<Title>请登录</Title>
					</Body>
					<Right />
				</Header>
			)
		};
  }

	constructor(props) {
		console.log('SIGNIN')
		super(props)
	}

	render() {
		const { name, pswd, navigation,
			signIn, onChangeName, onChangePswd } = this.props;

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

						<View style={styles.inputView}>
							{/* 账号输入框 */}
							<View style={[styles.view, styles.lineTopBottom]}>
								<Text style={styles.text}>
									账号
								</Text>

								<TextInput
									style={styles.textInputStyle}
									placeholder="请输入用户名"	// 没有任何文字输入时显示
									secureTextEntry={false}	// 是否敏感
									onChangeText={onChangeName}	// 文本框内容变化时调用
									value={name}
								/>
							</View>

							{/* 密码输入框 */}
							<View style={[styles.view, styles.lineTopBottom]}>
								<Text style={styles.text}>
									密码
								</Text>

								<TextInput
									style={styles.textInputStyle}
									placeholder="请输入密码"
									secureTextEntry={true}
									onChangeText={onChangePswd}
									value={pswd}
								/>
							</View>
						</View>

						{/* 登录按钮 */}
						<View style={styles.buttonView}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => signIn(() => navigation.navigate('userSync'))}	// 登录功能
							>
								<Text style={styles.buttonText}>登录</Text>
							</TouchableOpacity>
						</View>

						{/* 注册按钮 */}
						<View style={styles.buttonView}>
							<TouchableOpacity
								style={[styles.button, {backgroundColor: "yellow"}]}
								onPress={() => {navigation.navigate('signUp')}}	// 跳转至注册
							>
								<Text style={styles.buttonText}>注册</Text>
							</TouchableOpacity>
						</View>

					</View>
				</ScrollView>
			</Container>

		);
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

const mapStateToProps = ({ syncInfo }) => ({
	name: syncInfo.name,
	pswd: syncInfo.pswd,
})

const mapDispatchToProps = (dispatch) => ({
	onChangeName: (name) => dispatch({type: 'change_name', name: name}),
	onChangePswd: (pswd) => dispatch({type: 'change_pswd', pswd: pswd}),
	signIn: (callBack) => dispatch({type: 'sign_in', callBack}),
})

const SignInView = connect(mapStateToProps, mapDispatchToProps)(SignIn)

const SyncView = createStackNavigator({
	signIn: {
		screen: SignInView,
	},
	signUp: {
		screen: SignUpView,
	},
	userSync: {
		screen: UserSyncView,
	}
}, {
		initialRouteKey: 'signIn',
	}
)

export default SyncView
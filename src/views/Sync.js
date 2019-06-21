import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  View,
	TextInput,
	Alert,
} from 'react-native';
import {
	Container, Header, Content, Button, Title,
	ListItem, SwipeRow, Item, Left, Body, Right,
} from 'native-base';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';

class Sync extends React.Component {

	constructor(props) {
		console.log('SYNC');
		super(props);
	}

	/*componentWillMount() {
		storage.load({
			key: 'account'
		}).then((ret) => {
			if (ret !== null) {
				this.setState({
					username: ret.username ? ret.username : '',
					password: ret.password ? ret.password : ''
				});
			}
		}).catch((err) => {
			console.log(err);
		});
	}*/

	signIn() {
		const { user, pswd, navigation } = this.props;

		// console.warn("username: " + user)
		// console.warn("password: " + pswd)

		if (user === '' || pswd === '') {
      Alert.alert('账号或密码不能为空');
      return;
		}

		fetch('49.234.16.186:60000/signin', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: user,
				pswd: pswd,
			})
		}).then((response) => {
			console.log(response);
			if (response.status === 200) {
				return response.json();
			}
			else if (response.status === 400) {
				return Alert.alert('登录失败！');
			}
			else {
				Alert.alert('unknown error!');
			}
		}).catch((error) => {
			console.error(error);
		})
	}

	render() {
		const { user, pswd, navigation,
			onChangeUser, onChangePswd } = this.props;

		return (
			<Container>
				<Header>
					<Left />
					<Body>
						<Title>同步</Title>
					</Body>
					<Right />
				</Header>

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
							{/* 用户名输入框 */}
							<View style={[styles.view, styles.lineTopBottom]}>
								<Text style={styles.text}>
									用户名:
								</Text>

								<TextInput
									style={styles.textInputStyle}
									placeholder="请输入用户名"	// 没有任何文字输入时显示
									clearButtonMode="while-editing"	// 文本框右侧显示清除按钮
									secureTextEntry={false}	// 是否敏感
									onChangeText={onChangeUser}	// 文本框内容变化时调用
									value={user}
								/>
							</View>

							{/* 密码输入框 */}
							<View style={[styles.view, styles.lineTopBottom]}>
								<Text style={styles.text}>密	码:</Text>

								<TextInput
									style={styles.textInputStyle}
									placeholder="请输入密码"
									clearButtonMode="while-editing"
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
								onPress={() => this.signIn()}// 登录功能
							>
								<Text style={styles.buttonText}>登录</Text>
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

const mapStateToProps = ({ accountInfo, syncInfo }) => ({
	user: syncInfo.user,
	pswd: syncInfo.pswd,
	data: syncInfo.data,
});

const mapDispatchToProps = (dispatch) => ({
	onChangeUser: (user) => dispatch({ type: 'change_user', user: user}),
	onChangePswd: (pswd) => dispatch({ type: 'change_pswd', pswd: pswd}),
});

const SyncView = connect(mapStateToProps, mapDispatchToProps)(Sync);

export default SyncView;
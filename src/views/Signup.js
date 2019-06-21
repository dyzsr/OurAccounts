import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	StyleSheet,
	PixelRatio,
	Text,
	TextInput,
  TouchableOpacity,
  ScrollView,
  View,
	Alert,
} from 'react-native'
import {
	Container, Header, Content, Button, Title, Icon,
	ListItem, SwipeRow, Item, Left, Body, Right,
} from 'native-base'
import { createStackNavigator, HeaderBackButton } from 'react-navigation'

class SignUp extends React.Component {
	static navigationOptions({navigation}) {
    return {
      title: 'SignUp',
			header: (
				<Header>
          <Left>
            <Button transparent
              onPress={navigation.getParam('onClickBack')}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
					<Body>
						<Title>注册</Title>
					</Body>
					<Right />
				</Header>
			)
    };
  }

	constructor(props) {
		console.log('SIGNUP')
		super(props)
	}

	componentDidMount() {
    const { navigation, onClickBack } = this.props;
    navigation.setParams({
      onClickBack: () => onClickBack(navigation.goBack)
    });
  }

	render() {
		const { sname, spswd, reppswd, navigation,
			signUp, onSignName, onSignPswd, onSignReppswd } = this.props
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
									placeholder="6~16位，仅包含数字和字母，区分大小写"	// 没有任何文字输入时显示
									secureTextEntry={false}	// 是否敏感
									onChangeText={onSignName}	// 文本框内容变化时调用
									value={sname}
								/>
							</View>

							{/* 密码输入框 */}
							<View style={[styles.view, styles.lineTopBottom]}>
								<Text style={styles.text}>
									密码
								</Text>

								<TextInput
									style={styles.textInputStyle}
									placeholder="6~16位，仅包含数字和字母，区分大小写"
									secureTextEntry={true}
									onChangeText={onSignPswd}
									value={spswd}
								/>
							</View>

							{/* 重复密码输入框 */}
							<View style={[styles.view, styles.lineTopBottom]}>
								<Text style={styles.text}>
									重复密码
								</Text>

								<TextInput
									style={styles.textInputStyle}
									placeholder="请确认两次密码输入一致"
									clearButtonMode="while-editing"
									secureTextEntry={true}
									onChangeText={onSignReppswd}
									value={reppswd}
								/>
							</View>
						</View>

						{/* 注册按钮 */}
						<View style={styles.buttonView}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => signUp(navigation.goBack)} // 注册功能
							>
								<Text style={styles.buttonText}>注册</Text>
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

const mapStateToProps = ({ syncInfo }) => ({
	sname: syncInfo.sname,
	spswd: syncInfo.spswd,
	reppswd: syncInfo.reppswd,
})

const mapDispatchToProps = (dispatch) => ({
	onClickBack: (callBack) => {
    dispatch({type: 'sign_clear'})
		dispatch({type: 'sign_back', callBack})
		console.log('BACK')
	},
	signUp: (callBack) => dispatch({type: 'sign_up', callBack}),
	onSignName: (sname) => dispatch({type: 'sign_name', sname: sname}),
	onSignPswd: (spswd) => dispatch({type: 'sign_pswd', spswd: spswd}),
	onSignReppswd: (reppswd) => dispatch({type: 'sign_reppswd', reppswd: reppswd}),
})

const SignUpView = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpView
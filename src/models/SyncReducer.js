import { Alert } from 'react-native'

const INITIAL_STATE = {
	name: '',
	pswd: '',
	data: [],
	sname: '',
	spswd: '',
	reppswd: '',
}

const syncReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'change_name': return handleChangeName(state, action)
		case 'change_pswd': return handleChangePswd(state, action)
		case 'sign_name': return handleSignName(state, action)
		case 'sign_pswd': return handleSignPswd(state, action)
		case 'sign_reppswd': return handleSignReppswd(state, action)
		case 'sign_clear': return handleSignClear(state)
		case 'sign_back': return handleSignBack(state, action)
		case 'sign_in': return handleSignIn(state)
		case 'sign_up': return handleSignUp(state, action)
		case 'sync_up': return handleSyncUp(state, action)
		case 'sync_down': return handleSyncDown(state, action)
	}
	return state
}

const handleChangeName = (state, {name}) => {
	return {...state, name: name}
}

const handleChangePswd = (state, {pswd}) => {
	return {...state, pswd: pswd}
}

const handleSignName = (state, {sname}) => {
	return {...state, sname: sname}
}

const handleSignPswd = (state, {spswd}) => {
	return {...state, spswd: spswd}
}

const handleSignReppswd = (state, {reppswd}) => {
	return {...state, reppswd: reppswd}
}

const handleSignClear = (state) => {
	return {...state, sname: '', spswd: '', reppswd: ''}
}

const handleSignBack = (state, {callBack}) => {
	callBack()
	return state
}

const handleSignIn = (state) => {
}

const handleSignUp = (state, {callBack}) => {
	if (state.spswd != state.reppswd) {
		Alert.alert('两次密码输入不一致!')
		return state
	}

	if (state.sname === '' || state.spswd === '') {
		Alert.alert('账号和密码不能为空!')
		return state
	}

	fetch('http://49.234.16.186:60000/signup', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: state.sname,
			pswd: state.spswd,
		})
	}).then((response) => {
		console.log("response: ")
		console.log(response)
		console.log("http status code: " + response.status)

		if (response.status == 200) {	//　账号密码正确，跳转回登录界面
			Alert.alert('注册成功!')
			callBack()
			return {...state, sname: '', spswd: '', reppswd: ''}
		}
		else if (response.status == 400) {	// 账号密码错误
			Alert.alert('账号已存在!')
		}
		else {	// 非程序内置逻辑
			Alert.alert('看到这个说明出 bug 啦!')
		}
	}).catch((error) => {
		console.error(error)
	});

	return state
}

const handleSyncUp = (state, {}) => {
}

const handleSyncDown = (state, {}) => {
}

export { syncReducer };
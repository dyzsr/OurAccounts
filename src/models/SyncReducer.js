const INITIAL_STATE = {
	user: '',
	pswd: '',
	data: [],
};

const syncReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'change_user': return handleChangeUser(state, action);
		case 'change_pswd': return handleChangePswd(state, action);
		case 'sign_in': return handleSignIn(state, action);
		case 'sign_up': return handleSignUp(state, action);
		case 'sync_up': return handleSyncUp(state, action);
		case 'sync_down': return handleSyncDown(state, action);
	}
	return state;
}

const handleChangeUser = (state, {user}) => {
	return {...state, user: user};
};

const handleChangePswd = (state, {pswd}) => {
	return {...state, pswd: pswd};
};

const handleSignIn = (state) => {
	if (user === '' || pswd === '') {
		Alert.alert('账号或密码不能为空');
		return state;
	}
	
	fetch('49.234.16.186:60000', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user: user,
			pswd: pswd,
		})
	}).then((response) => {
		if (response.status === 200) {
			return response.json();
		}
		else if (response.status === 400) {
			return Alert.alert('登录失败！');
		}
		else {
			Alert.alert('unknown error!');
		}
	})
};

const handleSignUp = (state, {pswd}) => {
	;
};

const handleSyncUp = (state, {}) => {
	;
};

const handleSyncDown = (state, {}) => {
	;
};

export { syncReducer };
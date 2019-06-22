const signin = (name, pswd) => {
	return fetch('localhost:60000/signin', {
		method: 'POST',
		mode: 'cors',
		credentials: 'omit',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({name, pswd}),
	})
	.then(response => response.json());
}

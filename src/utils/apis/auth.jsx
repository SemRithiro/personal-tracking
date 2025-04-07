import { json_header, auth_json_header } from '../requestHeader';

import { cookies } from '../Secret';

export async function login({ username, password }) {
	return await fetch('http://localhost:8080/auth/login', {
		method: 'POST',
		headers: json_header(),
		body: JSON.stringify({ username, password }),
	})
		.then(async (raw) => await raw.json())
		.then((res) => {
			if (res['header']['statusCode'] >= 200 && res['header']['statusCode'] < 300) return res;
			throw new Error(res['header']['errorText']);
		});
}

export async function logout() {
	return await fetch('http://localhost:8080/auth/logout', {
		method: 'POST',
		headers: auth_json_header(),
	})
		.then(async (raw) => await raw.json())
		.then((res) => {
			if (res['header']['statusCode'] >= 200 && res['header']['statusCode'] < 300) return res;
			throw new Error(res['header']['message']);
		});
}

export async function refreshToken() {
	return await fetch('http://localhost:8080/auth/refresh-token', {
		method: 'POST',
		headers: json_header(),
		body: JSON.stringify({ refreshToken: cookies.get_refresh_token() }),
	})
		.then(async (raw) => await raw.json())
		.then((res) => {
			if (res['header']['statusCode'] >= 200 && res['header']['statusCode'] < 300) return res;
			throw new Error(res['header']['message']);
		});
}

export async function loadUser() {
	return await fetch('http://localhost:8080/user/me', {
		method: 'GET',
		headers: auth_json_header(),
	})
		.then(async (raw) => await raw.json())
		.then((res) => {
			if (res['header']['statusCode'] >= 200 && res['header']['statusCode'] < 300) return res;
			throw new Error(res['header']['message']);
		});
}

export async function loadPermission() {
	return null;
}

import cryptoJs from 'crypto-js';
import { APP_NAME, APP_SECRET } from '../constants/app';
import Cookies from 'js-cookie';

const charactor_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
const cookie_list = ['access_token', 'refresh_token'];

function generateCookieName() {
	let secret_code = 10;
	for (let i = 0; i < APP_NAME.length; i++) {
		secret_code += APP_NAME.charCodeAt(i) ^ APP_NAME.length;
	}

	let generated_cookie_name = {};
	cookie_list.forEach((cookie) => {
		let temp_cookie_name = '';
		for (let j = 0; j < cookie.length; j++) {
			let charCode = Math.floor(((cookie.charCodeAt(j) * secret_code) % charactor_list.length) + 1);
			temp_cookie_name += charactor_list[charCode];
		}
		generated_cookie_name[cookie] = temp_cookie_name;
	});
	return generated_cookie_name;
}

export const generated_cookie = generateCookieName();

export const cookies = {
	get_token: () => {
		let access_token = Cookies.get(generated_cookie.access_token);
		return access_token ? cryptoJs.AES.decrypt(access_token, APP_SECRET).toString(cryptoJs.enc.Utf8) : null;
	},
	get_refresh_token: () => {
		let refresh_token = Cookies.get(generated_cookie.refresh_token);
		return refresh_token ? cryptoJs.AES.decrypt(refresh_token, APP_SECRET).toString(cryptoJs.enc.Utf8) : null;
	},
	set_token: (access_token, refresh_token) => {
		Cookies.set(generated_cookie.access_token, cryptoJs.AES.encrypt(access_token, APP_SECRET).toString());
		Cookies.set(generated_cookie.refresh_token, cryptoJs.AES.encrypt(refresh_token, APP_SECRET).toString());
	},
	clear_cookies: () => {
		Cookies.remove(generated_cookie.access_token);
		Cookies.remove(generated_cookie.refresh_token);
	},
};

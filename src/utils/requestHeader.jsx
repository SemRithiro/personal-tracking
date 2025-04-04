import { cookies } from './Secret';

export const all_header = () => ({ Accept: '*/*' });

export const auth_header = () => {
	const accessToken = cookies.get_token();
	return {
		Accept: '*/*',
		Authorization: `Bearer ${accessToken}`,
	};
};

export const json_header = () => ({
	Accept: '*/*',
	'Content-Type': 'application/json',
});

export const auth_form_header = () => {
	const accessToken = cookies.get_token();
	return {
		Accept: '*/*',
		Authorization: `Bearer ${accessToken}`,
	};
};

export const auth_json_header = () => {
	const accessToken = cookies.get_token();
	return {
		Accept: '*/*',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
	};
};

export const auth_multi_part_header = () => {
	const accessToken = cookies.get_token();
	return {
		Accept: '*/*',
		'Content-Type': 'multipart/form-data',
		Authorization: `Bearer ${accessToken}`,
	};
};

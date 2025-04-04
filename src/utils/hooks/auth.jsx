import { AuthContext } from '../../libs/AuthContext';
import { login, logout, refreshToken, loadUser, loadPermission } from '../apis/auth';

export function loginFn(payload) {
	return login(payload);
}

export function logoutFn() {
	return logout();
}

export function refreshTokenFn() {
	return refreshToken();
}

export function loadUserFn() {
	return loadUser();
}

export function loadPermissionFn() {
	return loadPermission();
}

const { AuthProvider, useAuth } = AuthContext({
	loginFn,
	logoutFn,
	refreshTokenFn,
	loadUserFn,
	loadPermissionFn,
});

export { AuthProvider, useAuth };

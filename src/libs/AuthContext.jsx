import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';
import { AUTH_PERMISSION, AUTH_USER } from './QueryKeys';
import { toaster } from '../components/ui/toaster';

import { cookies } from '../utils/Secret';

export function AuthContext(config) {
	const AuthContext = createContext(null);
	const { loginFn, logoutFn, refreshTokenFn, loadUserFn, loadPermissionFn, loadUserkey = AUTH_USER, loadPermissionkey = AUTH_PERMISSION } = config;

	function AuthProvider({ children }) {
		const loadUser = useQuery({ queryKey: [loadUserkey], queryFn: loadUserFn });
		const loadPermission = useQuery({ queryKey: [loadPermissionkey], queryFn: loadPermissionFn, enabled: false });

		const loginMutation = useMutation({
			mutationFn: loginFn,
			onSuccess: (response) => {
				if (response['header']['statusCode'] >= 200 && response['header']['statusCode'] < 300) {
					toaster.create({ title: 'Success', description: response['header']['message'], type: 'success' });
					const { accessToken, refreshToken } = response['body'];
					cookies.set_token(accessToken, refreshToken);
					loadUser.refetch();
				} else {
					toaster.create({ title: response['header']['message'], description: response['header']['errorText'], type: 'error' });
				}
			},
		});

		const logoutMutation = useMutation({
			mutationFn: logoutFn,
			onSuccess: (response) => {
				cookies.clear_cookies();
			},
		});

		const refreshTokenMutation = useMutation({
			mutationFn: refreshTokenFn,
			onSuccess: (response) => {
				if (response['header']['statusCode'] >= 200 && response['header']['statusCode'] < 300) {
					toaster.create({ title: 'Success', description: response['header']['message'], type: 'success' });
					const { accessToken, refreshToken } = response['body'];
					cookies.set_token(accessToken, refreshToken);
				} else {
					toaster.create({ title: response['header']['message'], description: response['header']['errorText'], type: 'error' });
				}
			},
		});

		const value = useMemo(
			() => ({
				login: loginMutation.mutateAsync,
				loginStatus: loginMutation.status,
				loginFailedCount: loginMutation.failureCount,

				logout: logoutMutation.mutateAsync,
				logoutStatus: logoutMutation.status,

				refreshToken: refreshTokenMutation.mutateAsync,
				refreshTokenStatus: refreshTokenMutation.status,

				user: loadUser.data,
				error: loadUser.error,
				reloadUser: loadUser.refetch,
				permission: loadPermission.data,
				reloadPermission: loadPermission.refetch,
			}),
			[
				loginMutation.mutateAsync,
				loginMutation.status,
				loginMutation.failureCount,
				logoutMutation.mutateAsync,
				logoutMutation.status,
				refreshTokenMutation.mutateAsync,
				refreshTokenMutation.status,
				loadUser.data,
				loadUser.error,
				loadUser.refetch,
				loadPermission.data,
				loadPermission.refetch,
			]
		);

		return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
	}

	function useAuth() {
		const context = useContext(AuthContext);
		if (!context) throw new Error(`useAuth must be used within an AuthProvider`);
		return context;
	}

	return { AuthProvider, AuthConsumer: AuthContext.Consumer, useAuth };
}

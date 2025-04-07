import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AuthLayout from './layouts/authLayout';
import AdminLayout from './layouts/adminLayout';

import Login from './views/auth/login';

import Calendar from './views/admins/calendar';
import { useAuth } from './utils/hooks/auth';

export default function Router() {
	const { user } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				{!user ? (
					<Route path='/' element={<AdminLayout />}>
						<Route index element={<Calendar />} />

						<Route path='*' element={<Navigate to={'/'} />} />
					</Route>
				) : (
					<Route path='login' element={<AuthLayout />}>
						<Route index element={<Login />} />

						<Route path='*' element={<Navigate to={'/'} />} />
					</Route>
				)}
				<Route path='*' element={<Navigate to='/login' />} />
			</Routes>
		</BrowserRouter>
	);
}

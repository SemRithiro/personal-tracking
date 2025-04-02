import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from './layouts/authLayout';
import AdminLayout from './layouts/adminLayout';

import Login from './views/auth/login';

import Calendar from './views/admins/calendar';

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='login' element={<AuthLayout />}>
					<Route index element={<Login />} />
				</Route>

				<Route path='/' element={<AdminLayout />}>
					<Route index element={<Calendar />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

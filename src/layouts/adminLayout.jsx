import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
	return (
		<Flex w='100vw' h='100vh' bg='gray.100'>
			<Outlet />
		</Flex>
	);
}

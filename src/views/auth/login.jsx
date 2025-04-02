import React from 'react';
import { Fieldset, Stack, Field, Input, Button, Center, chakra, Image } from '@chakra-ui/react';

import { PasswordInput } from '../../components/ui/password-input';
import { useForm } from 'react-hook-form';

export default function Login() {
	const loginForm = useForm({});

	const handleLoginSubmit = (data) => {
		console.log(data);
	};

	return (
		<Center mx='3' px='10' w='lg' h='md' bg='white' borderRadius='md' shadow='md'>
			<chakra.form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} w='100%'>
				<Fieldset.Root alignItems='center'>
					<Image h='60px' src='/logo.png' />
					<Stack mb='7'>
						<Fieldset.Legend fontSize='2xl' alignSelf='center'>
							Login to your account
						</Fieldset.Legend>
						<Fieldset.HelperText alignSelf='center'>Your personal tracking system</Fieldset.HelperText>
					</Stack>
					<Fieldset.Content>
						<Field.Root invalid={loginForm.formState.errors.username}>
							<Field.Label>Username</Field.Label>
							<Input placeholder='username' {...loginForm.register('username', { required: 'Username is required.' })} />
							<Field.ErrorText>{loginForm.formState.errors.username?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={loginForm.formState.errors.password}>
							<Field.Label>Password</Field.Label>
							<PasswordInput placeholder='password' {...loginForm.register('password', { required: 'Password is required.', minLength: { value: 4, message: 'Password must be at least 4 characters.' } })} />
							<Field.ErrorText>{loginForm.formState.errors.password?.message}</Field.ErrorText>
						</Field.Root>
					</Fieldset.Content>
					<Button w='100%' type='submit'>
						Login
					</Button>
				</Fieldset.Root>
			</chakra.form>
		</Center>
	);
}

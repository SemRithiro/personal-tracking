import { QueryClient } from '@tanstack/react-query';

export const query_client = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			refetchIntervalInBackground: true,
		},
		mutations: {
			retry: false,
			onError: (error) => {
				console.log('Unexpected error: ', error.message);
			},
		},
	},
});

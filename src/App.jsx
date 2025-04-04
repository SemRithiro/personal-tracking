import { Provider as ChakraProvider } from './components/ui/provider';
import { QueryClientProvider } from '@tanstack/react-query';
import Router from './routers';

import 'react-datepicker/dist/react-datepicker.css';
import { query_client } from './libs/TanstackQuery';
import { AuthProvider } from './utils/hooks/auth';
import { Toaster } from './components/ui/toaster';

function App() {
	return (
		<ChakraProvider>
			<QueryClientProvider client={query_client}>
				<AuthProvider>
					<Toaster />
					<Router />
				</AuthProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default App;

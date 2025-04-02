import { Provider as ChakraProvider } from './components/ui/provider';
import Router from './routers';

import 'react-datepicker/dist/react-datepicker.css';

function App() {
	return (
		<ChakraProvider>
			<Router />
		</ChakraProvider>
	);
}

export default App;

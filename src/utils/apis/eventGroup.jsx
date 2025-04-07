import { eventGroups } from '../../constants/dummy';
import { auth_json_header } from '../requestHeader';

export async function getList() {
	return eventGroups;
	// return await fetch('http://localhost:8080/event-group/list', {
	// 	method: 'GET',
	// 	headers: auth_json_header(),
	// })
	// 	.then(async (raw) => await raw.json())
	// 	.then((res) => {
	// 		if (res['header']['statusCode'] >= 200 && res['header']['statusCode'] < 300) return [...res['body']];
	// 		throw new Error(res['header']['message']);
	// 	})
	// 	.catch((error) => {
	// 		throw new Error('Unexpected error: ' + error.message);
	// 	});
}

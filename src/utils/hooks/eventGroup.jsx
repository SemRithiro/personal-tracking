import { useQuery } from '@tanstack/react-query';
import { EVENT_GROUP } from '../../libs/QueryKeys';
import { getList } from '../apis/eventGroup';

export function useGetList() {
	return useQuery({ queryKey: [EVENT_GROUP], queryFn: () => getList() });
}

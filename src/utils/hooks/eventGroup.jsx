import { useQuery } from '@tanstack/react-query';
import { EVENT_GROUP } from '../../libs/QueryKeys';
import { getEventGroup } from '../apis/eventGroup';

export function useGetEventGroupList() {
	return useQuery({ queryKey: [EVENT_GROUP], queryFn: () => getEventGroup() });
}

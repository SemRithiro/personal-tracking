import { useQuery } from '@tanstack/react-query';
import { EVENT_SUBSCRIBED } from '../../libs/QueryKeys';
import { getEvents } from '../apis/event';

export function useGetEventList() {
	return useQuery({ queryKey: [EVENT_SUBSCRIBED], queryFn: () => getEvents() });
}

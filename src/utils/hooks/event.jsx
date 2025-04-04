import { useQuery } from '@tanstack/react-query';
import { EVENT_SUBSCRIBED } from '../../libs/QueryKeys';
import { getSubscribedEvent } from '../apis/event';

export function useSubscribedEvent() {
	return useQuery({ queryKey: [EVENT_SUBSCRIBED], queryFn: () => getSubscribedEvent() });
}

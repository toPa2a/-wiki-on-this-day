import { useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { useQuery } from '@tanstack/react-query';

import { eventsAdded } from '@/reducers/this-day';
import { setStatus } from '@/reducers/status';
import { wikiApi } from '@/utils/api';

const Button = () => {
  const dispatch = useDispatch();
  const { data, isFetching, isSuccess, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: () => wikiApi.getTodayEvents(),
    enabled: false,
  });

  useEffect(() => {
    if (data) dispatch(eventsAdded(data));
  }, [data, dispatch]);

  if (isSuccess && data) {
    dispatch(setStatus('loaded'));
  }

  if (isFetching) dispatch(setStatus('loading'));
  
  if (error) {
    dispatch(setStatus('error'));
  }

  const getEvents = () => {
    refetch();
  }

  return (
    <button onClick={getEvents} disabled={isFetching}>Get on This Date</button>
  )
}

export default Button;
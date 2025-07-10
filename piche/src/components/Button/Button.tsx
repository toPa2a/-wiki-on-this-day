import { useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { useQuery } from '@tanstack/react-query';

import { eventsAdded } from '@/reducers/this-day';
import { setStatus } from '@/reducers/status';
import { setError } from '@/reducers/error';
import { wikiApi } from '@/utils/api';

const Button = () => {
  const dispatch = useDispatch();
  const { data, isFetching, isSuccess, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: () => wikiApi.getTodayEvents(),
    enabled: false,
  });

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(eventsAdded(data));
      dispatch(setStatus('loaded'));
      dispatch(setError(null));
    } else if (isFetching) {
      dispatch(setStatus('loading'));
    } else if (error) {
      dispatch(setStatus('error'));
      dispatch(setError(error));
    }
  }, [data, isSuccess, isFetching, error, dispatch]);

  const getEvents = () => {
    refetch();
  }

  return (
    <button onClick={getEvents} disabled={isFetching}>Get on This Date</button>
  )
}

export default Button;
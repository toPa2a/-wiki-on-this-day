import { useSelector } from 'react-redux';

import ListItem from '../ListItem/ListItem';
import Loader from '../Loader/Loader';
import { getEvents } from '@/slices/this-day';
import { getStatus } from '@/slices/status';
import type { Items, Item } from '@/types/items';

import './List.css';

const List = () => {
  const events = useSelector(getEvents) as Items;
  const status = useSelector(getStatus);
  const eventTypes = Object.keys(events);
  const isEmpty = eventTypes.length === 0;

  return (
    <div className="events-list">
      {status === 'loading' && <Loader />}
      {!isEmpty && eventTypes.map(type => events[type].length > 0 && (
        <div key={type}>
          <h2>{type}</h2>

          <ul>
            {events[type]?.map((event: Item, i: number) => (
              <ListItem key={`${i}-${event.year}-${type}`} event={event} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default List;
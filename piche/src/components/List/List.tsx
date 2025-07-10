import { useSelector } from 'react-redux';

import ListItem from '../ListItem/ListItem';
import Loader from '../Loader/Loader';
import { getEvents } from '@/reducers/this-day';
import { getStatus } from '@/reducers/status';
import type { Items, Item } from '@/types/items';

import './List.css';

const eventTypes = [
  'selected',
  'births',
  'deaths',
  'events',
  'holidays',
];

const List = () => {
  const events = useSelector(getEvents) as Items;
  const status = useSelector(getStatus);
  const isEmpty = Object.keys(events).length === 0;

  return !isEmpty && (
    <div className="events-list">
      {status === 'loading' && <Loader />}
      {eventTypes.map(type => events[type].length > 0 && (
        <div key={type}>
          <h2>{type.toUpperCase()}</h2>

          {events[type]?.map((event: Item, i: number) => (
            <ListItem key={`${i}-${event.year}-${type}`} event={event} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default List;
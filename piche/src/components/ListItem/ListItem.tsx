import { wikiApi } from '@/utils/api';
import { replaceWithLinks } from '@/utils/helpers';
import type { Item } from '@/types/items';

const ListItem = ({ event }: { event: Item }) => {
  const year = event.year 
    && <a 
      href={`${wikiApi.getBaseUrl()}${event.year}`} 
      className='envet-item__year'
      target='_blank'
    >
      {event.year}
    </a>;
  
  const delimiter = event.year ? ' - ' : '';

  return (
    <li className="event-item">
      {year}
      {delimiter}
      <span className='event-item__text'>
        {replaceWithLinks(event.text, event.pages)}
      </span>
    </li>
  );
};

export default ListItem;
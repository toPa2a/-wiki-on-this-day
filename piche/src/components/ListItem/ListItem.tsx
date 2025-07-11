import type { Item } from '@/types/items';
import { wikiApi } from '@/utils/api';

const replaceWithLinks = (text: string, pages: Item['pages']): Array<string | React.ReactNode> => {
  const sortedPages = [...pages].sort((a, b) => {
    const aUrlLength = a.content_urls.desktop.page.length;
    const bUrlLength = b.content_urls.desktop.page.length;

    return aUrlLength - bUrlLength;
  });
  let formattedText: Array<string | React.ReactNode> = [text];
  const passedPages: Array<string> = [];

  sortedPages.forEach((page, i) => {
    const { normalizedtitle, content_urls: { desktop: { page: url } } } = page;

    if (passedPages.find(page => page.includes(normalizedtitle))) return;

    const titleRegex = new RegExp(`(${normalizedtitle})`, 'ig');

    formattedText = formattedText.flatMap((part) => {
      if (typeof part === 'string') {
        const subParts = part.split(titleRegex);

        if (subParts.length === 1) return part;
        
        return subParts.map((subPart, subPartIndex) => {
          if (subPart.toLowerCase() === normalizedtitle.toLowerCase()) {
            return (
              <a
                key={`${subPartIndex}-${i}`}
                href={url}
                target="_blank"
              >
                {subPart}
              </a>
            );
          }
          
          return subPart;
        });
      }

      return part;
    });

    passedPages.push(normalizedtitle);
  });

  return formattedText;
};

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
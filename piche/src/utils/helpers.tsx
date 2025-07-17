import { v4 as uuidv4 } from 'uuid';
import type { Item } from '@/types/items';

const getFineDate = (date: number): string => date < 10 ? `0${date}` : `${date}`;

const replaceWithLinks = (text: string, pages: Item['pages']): Array<string | React.ReactNode> => {
  const sortedPages = [...pages].sort((a, b) => {
    const aUrlLength = a.content_urls.desktop.page.length;
    const bUrlLength = b.content_urls.desktop.page.length;

    return aUrlLength - bUrlLength;
  });
  let formattedText: Array<string | React.ReactNode> = [text];
  const passedPages: Array<string> = [];

  sortedPages.forEach((page) => {
    const { normalizedtitle, content_urls: { desktop: { page: url } } } = page;

    if (passedPages.find(page => page.includes(normalizedtitle))) return;

    const titleRegex = new RegExp(`(${normalizedtitle})`, 'ig');

    formattedText = formattedText.flatMap((part) => {
      if (typeof part === 'string') {
        const subParts = part.split(titleRegex);

        if (subParts.length === 1) return part;
        
        return subParts.map((subPart) => {
          if (subPart.toLowerCase() === normalizedtitle.toLowerCase()) {
            return (
              <a
                key={uuidv4()}
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

export {
  getFineDate,
  replaceWithLinks,
};
export type Item = {
  text: string;
  pages: Array<{
    normalizedtitle: string;
    content_urls: {
      desktop: {
        page: string;
      };
    }; 
  }>;
  year: number;
};

export type Items = {
  [key: string]: Array<Item>;
};
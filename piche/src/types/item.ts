export type Item = {
  text: string;
  pages: Array<{
    normalizedtitle: string;
    url: string; 
  }>;
  year: number;
};
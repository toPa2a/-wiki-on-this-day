import { getFineDate } from './helpers';

class WikiApi {
  async getTodayEvents() {
    const today = new Date();
    const day = getFineDate(today.getDate());
    const month = getFineDate(today.getMonth() + 1);
    const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`);

    if (!response.ok) {
      throw new Error(`Something went wrong, network status: ${response.status}`);
    }

    return await response.json();
  }

  getBaseUrl() {
    return 'https://en.wikipedia.org/wiki/';
  }
}

export const wikiApi = new WikiApi();
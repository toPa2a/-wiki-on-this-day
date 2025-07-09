import { getFineDate } from './helpers';

class WikiApi {
  async getTodayEvents() {
    const today = new Date();
    const day = getFineDate(today.getDate());
    const month = getFineDate(today.getMonth() + 1);

    return await (await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${day}/${month}`)).json();
  }
}

export const wikiApi = new WikiApi();
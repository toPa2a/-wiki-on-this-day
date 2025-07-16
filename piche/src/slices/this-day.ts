import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item, Items } from '@/types/items';

const todayEventsSlice = createSlice({
  name: 'todayEvents',
  initialState: {} as Items,
  reducers: {
    eventsAdded: {
      reducer(state, action: PayloadAction<Items>) {
        return action.payload;
      },
      prepare(resp) {
        const listOfItems: Items = {};
        const keys = Object.keys(resp);

        keys.forEach(key => {
          const uniqueTexts: Array<string> = [];

          listOfItems[key] = resp[key].filter((item: Item) => {
            if (uniqueTexts.includes(item.text)) return false;

            uniqueTexts.push(item.text);
            return true;
          });
          listOfItems[key] = listOfItems[key].sort((a:Item, b:Item) => b.year - a.year);
        });

        return { payload: listOfItems };
      },
    },
  },
});


export const { eventsAdded } = todayEventsSlice.actions;
export const getEvents = (state: { todayEvents: object; }) => state.todayEvents;
export default todayEventsSlice.reducer;
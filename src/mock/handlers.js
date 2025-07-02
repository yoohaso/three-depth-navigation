import { http, HttpResponse } from 'msw';
import { navigation } from './data';

export const handlers = [
  http.get('/api/navigations', () => {
    return HttpResponse.json({ navigation });
  }),
];

import { api } from '@renderer/core/api';

export default {
  'Alt+F4': () => {
    api.send('close:main');
  },
  'Command+Q': () => {
    api.send('close:main');
  },
};

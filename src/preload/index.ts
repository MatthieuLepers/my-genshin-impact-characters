import { contextBridge } from 'electron';

import api from '@/main/api';

contextBridge.exposeInMainWorld('api', api);

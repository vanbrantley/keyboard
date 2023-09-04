import { createContext } from 'react';
import appStore from '../store/store';

export const AppStoreContext = createContext(appStore);
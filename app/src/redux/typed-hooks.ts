import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, store } from './store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;

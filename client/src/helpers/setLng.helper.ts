import { LocalStorageKeys } from 'constants/LocalStorageKeys';

export const setLng = (value: string) => localStorage.setItem(LocalStorageKeys.SESSION_LNG, value);

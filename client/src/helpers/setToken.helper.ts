import { LocalStorageKeys } from 'constants/LocalStorageKeys';

export const setToken = (token: string): void => localStorage.setItem(LocalStorageKeys.SESSION_TOKEN, token);

export const removeToken = (): void => localStorage.removeItem(LocalStorageKeys.SESSION_TOKEN);

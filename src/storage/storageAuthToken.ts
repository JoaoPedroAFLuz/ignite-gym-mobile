import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from './storageConfig';

export async function storageAuthTokenGet() {
  return AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
}

export async function storageAuthTokenSave(authToken: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(authToken));
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}

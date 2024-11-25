import AsyncStorage from '@react-native-async-storage/async-storage';

export const  storeTokens = async (name:string, value:string):Promise<void> => {
  try {
    await AsyncStorage.setItem(name, value);
    console.log('Tokens stored securely');
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
};

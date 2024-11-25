import { Linking } from 'react-native';

type DeepLinkHandler = (accessToken: string, refreshToken: string) => void;

/**
 * Handles deep link events, extracts tokens from the URL, and passes them to the callback.
 */
const handleDeepLink = (
  event: { url: string },
  onTokenReceived: DeepLinkHandler
): void => {
  const url = event.url;
  console.log('Deep Link URL:', url);

  if (url) {
    const params = new URLSearchParams(url.split('?')[1]);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
      onTokenReceived(accessToken, refreshToken);
    }
  }
};

/**
 * Initializes deep linking, listens for events, and handles initial URLs.
 */
export const setupDeepLinking = (onTokenReceived: DeepLinkHandler): (() => void) => {
  const listener = Linking.addEventListener('url', (event) => handleDeepLink(event, onTokenReceived));

  // Handle the initial link if the app was launched via a deep link
  Linking.getInitialURL().then((url) => {
    if (url) handleDeepLink({ url }, onTokenReceived);
  });

  // Return cleanup function
  return () => {
    listener.remove(); // Remove the listener when the component unmounts
  };
};

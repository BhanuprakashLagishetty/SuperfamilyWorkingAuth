// import { Image, StyleSheet, Platform, View } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import LoginScreen from '@/app/auth/Login';
// import OtpScreen from '@/app/auth/Otp';
// import SignUpScreen from '@/app/auth/SignUp';
// import { useEffect } from 'react';
// import { setupDeepLinking } from '../../utils/deeplinking';


// export default function HomeScreen() {

//   useEffect(() => {
//     const cleanup = setupDeepLinking((accessToken, refreshToken) => {
//       // Handle the received tokens
//       console.log('Received Access Token:', accessToken);
//       console.log('Received Refresh Token:', refreshToken);
//       // Here, you can save tokens, navigate, etc.
//     });

//     return cleanup; // Cleanup listener on unmount
//   }, []);
//   return (
//     <View style={style.container}>

//       <LoginScreen/>
      
//     </View>

//   );
// }
// const style=StyleSheet.create({
//   container:{
//     flex:1
//   }
// })

// import { useRouter } from 'expo-router';
// import { useEffect } from 'react';

// export default function Index() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace('/auth/Login'); // Redirect to the "wellness" tab
//   }, []);

//   return null;
// }



import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';

export default function FirstTab() {


  
  const router = useRouter();

  useEffect(() => {
    // Function to handle deep link and extract tokens
    const handleDeepLink = async () => {
      console.log("Bhanuprakahs deeplinking")
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl) {
        const { queryParams } = Linking.parse(initialUrl);

        // Check if tokens exist in the URL
        if (queryParams?.accessToken && queryParams?.refreshToken) {
          // Save tokens securely
          // await SecureStore.setItemAsync('accessToken', queryParams.accessToken);
          // await SecureStore.setItemAsync('refreshToken', queryParams.refreshToken);

          // console.log('Tokens saved:', {
          //   accessToken: queryParams.accessToken,
          //   refreshToken: queryParams.refreshToken,
          // });

          // Navigate to the home page or appropriate screen
          router.replace('/'); // Change '/home' to your actual post-login screen
        } else {
          console.warn('No tokens found in the URL');
          // Redirect to login if no tokens
          router.replace('/auth/Login');
        }
      } else {
        // If no initial URL, redirect to login
        router.replace('/auth/Login');
      }
    };

    handleDeepLink();
  }, [router]);

  return null; // This component doesn't render any UI
}



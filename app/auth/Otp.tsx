import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OtpScreen() {
  const [otp, setOtp] = useState<any>([]);
  const router = useRouter();
  const params = new URLSearchParams(window.location.search); 
  const email = params.get("email");


  const storeDate = async (value:any) => {
    try {
      await AsyncStorage.setItem('accessToken', value.accessToken); 
      await AsyncStorage.setItem('refreshToken',value.refreshToken); 
    } catch (e) {
      console.error("Error storing data", e);
    }
  };
  const handleNext = async(otpEnterd:string[]) => {
    console.log(otp,"otp")
    const otpString: string = otpEnterd.join("")
    try{
      const result=await axios.post("http://localhost:5000/api/auth/verify",{
        otp:otpString,
        email:email
      })
      console.log("result",result)
      storeDate(result.data); 
      router.push("./LoginSuccessfully");
      }
    catch(error)
    {
      console.log(error,"error")
    }
  };

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const handleTextChange = (text: string, index: number) => {
    if (text.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
    const newOtp = [...otp,text];
    setOtp(newOtp);
    console.log(newOtp,"newOtp")
 
    if(index==5)
    {
      handleNext(newOtp);
    }
  };
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/RectangleImg.png")}
          style={styles.backgroundImage}
        ></Image>
      </View>

      <View style={styles.otpContainer}>
        <Text style={styles.infoText}>OTP Will Be Sent To Xxxxxxxxxx</Text>
        <Text style={styles.welcomeText}>Enter OTP</Text>

        <View style={styles.otpInputContainer}>
          {inputRefs.map((_, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Didn’t Receive OTP?</Text>
          <View style={styles.linkContainer}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Edit Phone Number</Text>
            </TouchableOpacity>
            <Text style={styles.separator}> | </Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  backgroundImage: {},
  otpContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 500,
    color: "0047AB",
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
  },
  footerTextContainer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: "#0047AB",
    fontWeight: 500,
    fontSize: 14,
  },
  separator: {
    fontSize: 14,
    color: "#333",
  },
  imageContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

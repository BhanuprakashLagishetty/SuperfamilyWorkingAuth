import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
export default function PersonalDetails() {
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("Rounak Tilde");
  const [email, setEmail] = useState("melpeters@gmail.com");
  const [country, setCountry] = useState("India");
  const router = useRouter();
  const handleDateChange = (_:any, selectedDate:any) => {
    setShowDatePicker(false);
    if (selectedDate) setBirthday(selectedDate);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      <Image
        source={require("../../assets/images/Profile.png")}
        style={styles.profileImage}
      />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} editable={false} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} editable={false} />
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text>{birthday.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthday}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.label,
              { textAlign: "center", justifyContent: "center" },
            ]}
          >
            Gender
          </Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            value={gender}
            editable={true}
          />
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="65 kg"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Height</Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="5"
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.label}>Country/Region</Text>
        <TextInput style={styles.input} value={country} editable={false} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: "#000",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
  },
  profileImage: {
    width: "50%",
    height: "25%",
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  formContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    fontWeight: "bold",
    paddingTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16,
    marginTop: 5,
    borderRadius: 10,
  },
  textInput: {
    width: 70,
    height: 70,
    fontSize: 18,
    textAlign: "center",
  },
});

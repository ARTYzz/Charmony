// screens/DetailColorScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DetailColorScreen() {
  const navigation = useNavigation();

  const colorsOfTheDay = [
    {
      color: "#FF0000",
      name: "Red",
      description: "Helps enhance confidence and positive energy.",
    },
    {
      color: "#FFA500",
      name: "Orange",
      description: "Helps enhance creativity and fortune.",
    },
    {
      color: "#aa2a54",
      name: "Deep Pink",
      description: "Helps enhance love and personal charm.",
    },
    {
      color: "#33FF57",
      name: "Light Green",
      description: "Helps enhance health and inner peace.",
    },
    {
      color: "#3357FF",
      name: "Blue",
      description: "Helps enhance wisdom and intelligence.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.logo}>Detail Color</Text>
      </View>
      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.colorContainer}>
          {colorsOfTheDay.map((item, index) => (
            <View key={index} style={styles.colorSection}>
              <View style={[styles.colorBox, { backgroundColor: item.color }]}>
                <Text style={styles.colorName}>{item.name}</Text>
              </View>

              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerBar: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#5B3E90",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
    justifyContent: "center",
    padding: 10,
  },
  logo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  mainContent: { marginTop: 100, padding: 20, backgroundColor: "#fff" },
  colorContainer: { marginTop: 20 },
  colorSection: { marginBottom: 20, alignItems: "center" },

  colorBox: {
    width: "90%",
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  colorName: { color: "white", fontWeight: "bold", fontSize: 14 },
  description: {
    fontSize: 14,
    color: "#5B3E90",
    textAlign: "center",
    marginTop: 5,
  },
});

// screens/MatchColorScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function MatchColorScreen() {
  const looks = [
    {
      title: "Look 1: Confident",
      colors: ["#FF0000", "#FFA500", "#2de32d"],
      names: ["Red", "Orange", "Green"],
      descriptions: ["Help enhance confidence and positive energy."],
    },
    {
      title: "Look 2: Health",
      colors: ["#33FF57", "#28A745", "#85C1E9"],
      names: ["Light Green", "Deep Green", "Sky Blue"],
      descriptions: ["Help enhance health and peace of mind."],
    },
    {
      title: "Look 3: Creative",
      colors: ["#3357FF", "#ac2bf9", "#d48cff"],
      names: ["Blue", "Deep Purple", "Light Purple"],
      descriptions: ["Help enhance creativity and inspiration."],
    },
    {
      title: "Look 4: Charm",
      colors: ["#f92b70", "#aa2a54", "#ff92b6"],
      names: ["Pink", "Deep Pink", "Light Pink"],
      descriptions: ["Help enhance love and personal charm."],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateText}>Sunday, 9 March 2025</Text>
        <View style={styles.colorContainer}>
          {looks.map((look, index) => (
            <View key={index} style={styles.colorSection}>
              <Text style={styles.sectionTitle}>{look.title}</Text>
              <View style={styles.colorBoxContainer}>
                {look.colors.map((color, idx) => (
                  <View
                    key={idx}
                    style={[styles.colorBox, { backgroundColor: color }]}
                  >
                    <Text style={styles.colorName}>{look.names[idx]}</Text>
                  </View>
                ))}
              </View>
              {look.descriptions.map((desc, idx) => (
                <Text key={idx} style={styles.description}>
                  {desc}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mainContent: { padding: 20, backgroundColor: "#fff" },
  dateText: { fontSize: 16, fontWeight: "medium", color: "#1F2940" },
  colorContainer: { marginTop: 20 },
  colorSection: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1F2940",
  },

  colorBoxContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    backgroundColor: "#eee9f8",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },

  colorBox: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  colorName: { color: "white", fontWeight: "bold" },
  description: {
    fontSize: 14,
    color: "#5B3E90",
    textAlign: "left",
    marginTop: 5,
  },
});

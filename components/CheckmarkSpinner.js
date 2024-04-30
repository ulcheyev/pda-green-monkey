import React, { useState, useEffect } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

const CheckmarkSpinner = ({
  loading,
  showErrormark,
  showCheckmark,
  size,
  color,
}) => {
  const [spinAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [showCheckmark]);

  return (
    <View style={styles.container}>
      {showCheckmark ? (
        <Ionicons name="checkmark-circle" size={size} color={"green"} />
      ) : showErrormark ? (
        <Ionicons name="close-circle" size={size} color={"red"} />
      ) : (
        <ActivityIndicator size={size} color={color} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: "100%",
    height: "100%",
  },
});

export default CheckmarkSpinner;

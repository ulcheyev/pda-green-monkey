import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, Animated, View } from "react-native";
import { Easing } from "react-native";
const ProgressBar = ({
  height,
  progress,
  total,
  backGroundStyles,
  progressStyles,
  containerStyles,
  textStyles,
}) => {
  const isCompleted = () => {
    return progress === total;
  };

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [progress]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      ...containerStyles,
    },
    background: {
      flex: 1,
      height: height ?? 20,
      justifyContent: "center",
      alignItems: "center",
      ...backGroundStyles,
    },
    progressBar: {
      height: height ?? 20,
      borderBottomRightRadius: isCompleted()
        ? backGroundStyles.borderBottomRightRadius
        : 0,
      borderTopRightRadius: isCompleted()
        ? backGroundStyles.borderTopRightRadius
        : 0,
      justifyContent: "center",
      alignItems: "center",
      ...progressStyles,
      backgroundColor: isCompleted() ? "green" : progressStyles.backgroundColor,
    },
    text: textStyles ?? {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, total],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      >
        <Text style={styles.text}>{progress}</Text>
      </Animated.View>
      <View
        style={[
          styles.background,
          progress === 0
            ? {
                borderTopLeftRadius: backGroundStyles.borderTopRightRadius,
                borderBottomLeftRadius:
                  backGroundStyles.borderBottomRightRadius,
              }
            : {},
        ]}
      >
        <Text style={styles.text}>{total}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;

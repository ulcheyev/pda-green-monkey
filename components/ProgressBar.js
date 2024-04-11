import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
      {progress !== 0 && (
        <View
          style={[
            styles.progressBar,
            { width: `${(progress / total) * 100}%` },
          ]}
        >
          <Text style={styles.text}>{progress}</Text>
        </View>
      )}
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

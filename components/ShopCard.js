import * as React from "react";
import { useState } from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import ProgressBar from "./ProgressBar";

const ShopCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const animationValue = useState(new Animated.Value(0))[0];
  const theme = useTheme();
  const styles = StyleSheet.create({
    shopListAccordion: {
      backgroundColor: theme.colors.secondary,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 10,
      marginTop: 20,
      marginLeft: 7,
      marginRight: 7,
      paddingBottom: 20,
    },
    titleStyle: {
      backgroundColor: theme.colors.primary,
    },
    animationStyle: {
      height: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 300],
      }),
      overflow: "hidden",
    },
    itemsContainer: { backgroundColor: "#f0f0f0", padding: 10 },
    accordionTitleContainer: {
      margin: 10,
      flex: 1,
      flexDirection: "row",
    },
    accordionTitle: {
      fontSize: 20,
      flexGrow: 1,
    },
  });

  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setExpanded(!expanded);
  };

  const getTotal = () => {
    return props.shop.items.length;
  };

  const getProgress = () => {
    let progress = 0;
    for (let item of props.shop.items) {
      if (item.checked) {
        progress++;
      }
    }
    return progress;
  };

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <View style={styles.shopListAccordion}>
        <View style={styles.accordionTitleContainer}>
          <Text style={styles.accordionTitle}>{props.shop.name}</Text>
          <Icon source="menu-down" size={25} />
        </View>
        <ProgressBar
          progress={getProgress()}
          total={getTotal()}
          backGroundStyles={{
            backgroundColor: "#aab4e7",
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
          progressStyles={{
            backgroundColor: "#8592da",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
          containerStyles={{
            margin: 7,
          }}
          textStyles={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
          }}
          height={23}
        />
        <Animated.View style={styles.animationStyle}>
          <View style={styles.itemsContainer}>
            <// todo extendable shop items
            Text
            >
              prihodit kak to drakon k kabanu
            </Text>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopCard;

import * as React from "react";
import { useState } from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import { Animated, StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import ListItem from "./ListItem";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AddItemButton from "./AddItemButton";

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
    itemsContainer: { padding: 10 },
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

  const handleShopDelete = () => {
    if (!expanded) {
      props.shopDelete(props.shop.id, props.shop.name);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={toggleExpand}
      onLongPress={handleShopDelete}
      delayLongPress={500}
    >
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
            <FlatList
              alwaysBounceVertical={false}
              data={props.shop.items}
              renderItem={(item) => {
                return (
                  <ListItem
                    item={item}
                    updateProgress={props.updateProgress}
                    itemDelete={props.itemDelete}
                    setPhoto={props.showPhoto}
                    shopName={props.shop.name}
                  />
                );
              }}
            />
            <AddItemButton shop={props.shop} addItem={props.addItem} />
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ShopCard;
